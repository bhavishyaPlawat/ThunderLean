exports.calculateTDEE = (req, res) => {
  const { gender, weight, height, age, activityLevel } = req.body;

  if (!gender || !weight || !height || !age || !activityLevel) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let BMR;

  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultiplier = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    super_active: 1.9,
  };

  const multiplier = activityMultiplier[activityLevel];

  if (!multiplier) {
    return res.status(400).json({ error: "Invalid activity level" });
  }

  const TDEE = BMR * multiplier;

  res.json({
    BMR: Math.round(BMR),
    TDEE: Math.round(TDEE),
    maintenanceCalories: Math.round(TDEE),
    weightLossCalories: Math.round(TDEE - 500),
    weightGainCalories: Math.round(TDEE + 500),
  });
};
