// supabase/functions/analyze-meal/index.js
// Simple test version to verify connectivity

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

function extractAndValidateJSON(text) {
  console.log("Extracting JSON from:", text);

  // Find JSON object boundaries
  const firstBracket = text.indexOf("{");
  const lastBracket = text.lastIndexOf("}");

  if (
    firstBracket === -1 ||
    lastBracket === -1 ||
    firstBracket >= lastBracket
  ) {
    throw new Error("No valid JSON object found in AI response");
  }

  let jsonString = text.substring(firstBracket, lastBracket + 1);
  console.log("Extracted JSON string:", jsonString);

  try {
    const parsed = JSON.parse(jsonString);

    // Clean up the values - remove units and extra text
    const cleaned = {
      name: parsed.name || "Analyzed Meal",
      calories: cleanNumericValue(parsed.calories) || "0",
      protein: cleanNumericValue(parsed.protein) || "0",
      carbs: cleanNumericValue(parsed.carbs) || "0",
      fat: cleanNumericValue(parsed.fat) || "0",
    };

    console.log("Cleaned JSON:", cleaned);
    return JSON.stringify(cleaned);
  } catch (parseError) {
    console.error("JSON parse error:", parseError);
    throw new Error(`Failed to parse AI response: ${parseError.message}`);
  }
}

function cleanNumericValue(value) {
  if (!value) return "0";
  // Remove common units and extra text, keep only numbers
  const cleaned = String(value).replace(/[^\d.]/g, "");
  return cleaned || "0";
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Function called successfully");

    // Test basic functionality first
    const formData = await req.formData();
    const mealDescription = formData.get("meal");
    const mealImage = formData.get("mealImage");

    console.log("Received data:", {
      hasMeal: !!mealDescription,
      hasImage: !!mealImage,
      meal: mealDescription,
    });

    // Check if API key exists
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable not set");
    }
    console.log("API key found:", apiKey.substring(0, 10) + "...");

    // Now let's add back the real Gemini API call
    if (!mealDescription && !mealImage) {
      throw new Error("Bad Request: Meal description or image is required.");
    }

    // Build the request for Gemini
    const parts = [];
    let textPrompt;
    const mealName = mealDescription || "Analyzed Meal";

    if (mealImage) {
      console.log("Processing image...");
      const imageBuffer = await mealImage.arrayBuffer();
      console.log("Image size:", imageBuffer.byteLength);

      if (imageBuffer.byteLength > 4 * 1024 * 1024) {
        throw new Error(
          "Image file too large. Please use an image smaller than 4MB."
        );
      }

      const imageBase64 = arrayBufferToBase64(imageBuffer);
      parts.push({
        inline_data: { mime_type: mealImage.type, data: imageBase64 },
      });

      textPrompt = `Analyze the food in this image very precisely as a food specialist analyse the quantity of food and then carefully determine the nutritions. Context: "${mealDescription}". 

IMPORTANT: You must respond with ONLY a valid JSON object in this exact format:
{"name": "Food Name", "calories": "347", "protein": "28", "carbs": "30", "fat": "12"}

Use only numbers for nutritional values (no units like 'g' or 'kcal'). Do not include any other text, explanations, or markdown formatting.`;
    } else {
      console.log("Processing text description:", mealDescription);
      textPrompt = `Analyze this meal carefully: "${mealDescription}". 

IMPORTANT: You must respond with ONLY a valid JSON object in this exact format:
{"name": "${mealName}", "calories": "347", "protein": "28", "carbs": "30", "fat": "12"}

Use only numbers for nutritional values (no units like 'g' or 'kcal'). Do not include any other text, explanations, or markdown formatting.`;
    }

    parts.push({ text: textPrompt });

    // Call Gemini API with retry logic
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let geminiData;
    let attempt = 0;
    const maxRetries = 3;

    while (attempt < maxRetries) {
      try {
        console.log(`Gemini API attempt ${attempt + 1}/${maxRetries}`);

        const geminiResponse = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts }] }),
        });

        if (geminiResponse.ok) {
          geminiData = await geminiResponse.json();
          break;
        }

        const errorBody = await geminiResponse.text();
        console.log(
          `Attempt ${attempt + 1} failed:`,
          geminiResponse.status,
          errorBody
        );

        if (
          [503, 429, 502, 500].includes(geminiResponse.status) &&
          attempt < maxRetries - 1
        ) {
          const delay = Math.pow(2, attempt + 1) * 1000; // 2s, 4s, 8s
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          attempt++;
          continue;
        }

        throw new Error(
          `Gemini API error (${geminiResponse.status}): ${errorBody}`
        );
      } catch (error) {
        if (attempt === maxRetries - 1) {
          throw error;
        }
        console.log(`Network error on attempt ${attempt + 1}:`, error.message);
        const delay = Math.pow(2, attempt + 1) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      }
    }

    const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiText) {
      throw new Error("Invalid or empty response from Gemini API.");
    }

    console.log("Raw AI response:", aiText);

    // Extract and clean the JSON
    const cleanedJSON = extractAndValidateJSON(aiText);
    console.log("Cleaned JSON:", cleanedJSON);

    return new Response(JSON.stringify({ result: cleanedJSON }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
