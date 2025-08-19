// supabase/functions/strava-sync/index.js
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_ANON_KEY"),
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Fetch user's Strava tokens
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "strava_access_token, strava_refresh_token, strava_token_expires_at"
      )
      .eq("id", user.id)
      .single();

    if (profileError || !profile.strava_access_token) {
      throw new Error("Strava not connected for this user.");
    }

    // NOTE: You should add token refresh logic here for a production app
    // by checking if `strava_token_expires_at` is in the past.

    // Fetch activities from Strava
    const stravaResponse = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=30",
      {
        headers: { Authorization: `Bearer ${profile.strava_access_token}` },
      }
    );

    if (!stravaResponse.ok)
      throw new Error("Failed to fetch activities from Strava.");
    const stravaActivities = await stravaResponse.json();

    // Prepare data for Supabase
    const activitiesToUpsert = stravaActivities.map((activity) => ({
      user_id: user.id,
      strava_activity_id: activity.id.toString(), // Ensure it's a string
      name: activity.name,
      distance: activity.distance,
      moving_time: activity.moving_time,
      type: activity.type,
      start_date: activity.start_date,
      calories: activity.calories,
    }));

    if (activitiesToUpsert.length === 0) {
      return new Response(
        JSON.stringify({ message: "No new activities to sync." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Upsert activities into the database to avoid duplicates
    const { error: upsertError } = await supabase
      .from("strava_activities")
      .upsert(activitiesToUpsert, { onConflict: "strava_activity_id" });

    if (upsertError) throw upsertError;

    return new Response(
      JSON.stringify({
        message: `Successfully synced ${activitiesToUpsert.length} activities.`,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
