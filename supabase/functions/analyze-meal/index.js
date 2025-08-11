// supabase/functions/analyze-meal/index.js
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const mealDescription = formData.get("meal");
    const mealImage = formData.get("mealImage");
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey)
      throw new Error("Authentication Error: Missing GEMINI_API_KEY secret.");
    if (!mealDescription && !mealImage) {
      throw new Error("Bad Request: Meal description or image is required.");
    }

    const parts = [];
    let textPrompt;
    let mealName = mealDescription || "Analyzed Meal";

    if (mealImage) {
      const imageBuffer = await mealImage.arrayBuffer();
      const imageBase64 = arrayBufferToBase64(imageBuffer);
      parts.push({
        inline_data: { mime_type: mealImage.type, data: imageBase64 },
      });
      textPrompt = `Analyze the food in this image, using the following description for context: "${mealDescription}". If the user specifies quantity, use that to improve accuracy. Return nutritional info (calories, protein, carbs, fat) ONLY in a raw JSON object format. Do not include markdown or any conversational text. Example: {"name": "Identified Meal", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
    } else {
      textPrompt = `Analyze this meal: "${mealDescription}". If the user specifies quantity, use that to improve accuracy. Return nutritional info (calories, protein, carbs, fat) ONLY in a raw JSON object format. Do not include markdown or any conversational text. Example: {"name": "${mealName}", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
    }

    parts.push({ text: textPrompt });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] }),
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      throw new Error(
        `Gemini API error (${geminiResponse.status}): ${errorBody}`
      );
    }

    const geminiData = await geminiResponse.json();
    const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiText) throw new Error("Invalid or empty response from Gemini API.");

    // --- THIS IS THE FIX ---
    // Find the first '{' and the last '}' to reliably extract the JSON object
    const firstBracket = aiText.indexOf("{");
    const lastBracket = aiText.lastIndexOf("}");
    const jsonString = aiText.substring(firstBracket, lastBracket + 1);
    // --- END OF FIX ---

    return new Response(JSON.stringify({ result: jsonString }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Critical Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
