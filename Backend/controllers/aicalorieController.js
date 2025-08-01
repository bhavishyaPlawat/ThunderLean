const axios = require("axios");

const analyzeMeal = async (req, res) => {
  const mealDescription = req.body.meal;
  const mealImage = req.file;
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("Meal description received:", mealDescription);
  console.log("Meal image received:", mealImage ? "Yes ✅" : "No ❌");
  console.log("Using API key:", apiKey ? "Yes ✅" : "No ❌");

  if (!mealDescription && !mealImage) {
    return res
      .status(400)
      .json({ error: "Meal description or image is required" });
  }

  try {
    const parts = [];
    let textPrompt;

    if (mealImage) {
      // Add the image part
      parts.push({
        inline_data: {
          mime_type: mealImage.mimetype,
          data: mealImage.buffer.toString("base64"),
        },
      });

      // If there's also a description, use it to refine the image analysis
      if (mealDescription && mealDescription !== mealImage.originalname) {
        textPrompt = `Analyze the food in this image, using the following description for context: "${mealDescription}". If the user specifies quantity (e.g., '2 chapatis', 'a large bowl'), use that to improve the accuracy of the nutritional estimate. Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"name": "${mealDescription}", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
      } else {
        // Default prompt for image-only analysis
        textPrompt = `Analyze the food in this image. Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"name": "The meal name", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
      }
    } else {
      // Prompt for text-only analysis
      textPrompt = `Analyze this meal thoroughly: "${mealDescription}". If the user specifies quantity (e.g., '2 chapatis', 'a large bowl'), use that to improve the accuracy of the nutritional estimate. Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"name": "${mealDescription}", "calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`;
    }

    parts.push({ text: textPrompt });

    // --- THIS IS THE CORRECTED LINE ---
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(apiUrl, {
      contents: [{ parts }],
    });

    const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Clean the response to ensure it's valid JSON
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

module.exports = { analyzeMeal };
