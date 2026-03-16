const axios = require("axios");

// --- analyzeMeal FUNCTION (NO CHANGES) ---
const analyzeMeal = async (req, res) => {
  const mealDescription = req.body.meal;
  const mealImage = req.file;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!mealDescription && !mealImage) {
    return res
      .status(400)
      .json({ error: "Meal description or image is required" });
  }

  try {
    const parts = [];
    let textPrompt;

    if (mealImage) {
      parts.push({
        inline_data: {
          mime_type: mealImage.mimetype,
          data: mealImage.buffer.toString("base64"),
        },
      });
      if (mealDescription && mealDescription !== mealImage.originalname) {
        textPrompt = `Analyze the food in this image, using the following description for context: "${mealDescription}". If the user specifies quantity (e.g., '2 chapatis', 'a large bowl'), use that to improve the accuracy of the nutritional estimate. Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"name": "${mealDescription}", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
      } else {
        textPrompt = `Analyze the food in this image. Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"name": "The meal name", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
      }
    } else {
      textPrompt = `Analyze this meal thoroughly: "${mealDescription}". If the user specifies quantity (e.g., '2 chapatis', 'a large bowl'), use that to improve the accuracy of the nutritional estimate. Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"name": "${mealDescription}", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
    }

    parts.push({ text: textPrompt });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(apiUrl, {
      contents: [{ parts }],
    });

    const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanedText = aiText.replace(/```json|```/g, "").trim();

    res.json({ result: cleanedText });
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to analyze meal with Gemini" });
  }
};

// --- UPDATED FUNCTION TO GET HEALTH TIPS BASED ON A PROMPT ---
const getHealthTip = async (req, res) => {
  const { prompt } = req.body; // Changed from 'goal' to 'prompt'
  const apiKey = process.env.GEMINI_API_KEY;

  if (!prompt) {
    return res.status(400).json({ error: "A prompt is required" });
  }

  const fullPrompt = `Act as a friendly fitness expert. Answer the following user query with detail in bulletins and paragraph combination for best efficiency and as super professional fitness trainer not more than 150 words with good formatting in markdown and helpfully: "${prompt}". Do not include any introductory text like "Here's a tip:". Just provide the tip itself as plain text.`;

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: fullPrompt }] }],
    });

    const tip = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ tip: tip.trim() });
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch health tip" });
  }
};

module.exports = { analyzeMeal, getHealthTip };
