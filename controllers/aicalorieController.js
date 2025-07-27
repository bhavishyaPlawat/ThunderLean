const axios = require("axios");

const analyzeMeal = async (req, res) => {
  const { meal } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("Meal received:", meal);
  console.log("Using API key:", apiKey ? "Yes ✅" : "No ❌");

  if (!meal) {
    return res.status(400).json({ error: "Meal description is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze this meal throroughly: "${meal}". Return estimated calories, protein, carbs, and fat only in raw JSON format no markdown or explanations like: {"calories": "XXX kcal", "protein": "XX g", "carbs": "XX g", "fat": "XX g"}`,
              },
            ],
          },
        ],
      }
    );

    const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ result: aiText });
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to analyze meal with Gemini" });
  }
};

module.exports = { analyzeMeal };
