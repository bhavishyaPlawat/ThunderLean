import pandas as pd
import re

# Load the food database
def load_database():
    # Read the CSV file
    df = pd.read_csv('food_database.csv')
    # REMOVE DUPLICATES based on the 'Name' column
    df = df.drop_duplicates(subset=['Name'], keep='first')
    return df

# Calculate daily recommended values based on user profile
def calculate_daily_recommendations(age, weight, height, gender, activity_level):
    """
    Calculate daily nutritional recommendations based on user profile
    """
    # Basic calorie calculation using Mifflin-St Jeor Equation
    if gender.lower() == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    
    # Activity multiplier
    activity_multipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very_active': 1.9
    }
    
    daily_calories = bmr * activity_multipliers.get(activity_level.lower(), 1.2)
    
    # Macronutrient recommendations (standard ratios)
    recommendations = {
        'Calories': daily_calories,
        'Protein (g)': (daily_calories * 0.15) / 4,  # 15% of calories
        'Carbs (g)': (daily_calories * 0.55) / 4,   # 55% of calories
        'Fat (g)': (daily_calories * 0.30) / 9,     # 30% of calories
        'Fiber (g)': 25,  # Standard recommendation
        'Sugar (g)': (daily_calories * 0.10) / 4,   # Max 10% of calories
        'Sodium (mg)': 2300,
        'Cholesterol (mg)': 300,
        'Saturated Fat (g)': (daily_calories * 0.10) / 9,  # Max 10% of calories
        'Potassium (mg)': 3500,
        'Calcium (mg)': 1000
    }
    
    return {k: round(v, 1) for k, v in recommendations.items()}

# The main function to parse user input and calculate nutrition
def calculate_meal_totals(user_input, database_df):
    """
    Takes a string like 'apple 2, chapati 1, dal 1 bowl'
    and returns the total calories, protein, etc.
    """
    # Initialize totals - UPDATED WITH NEW COLUMNS
    totals = {
        'Calories': 0, 'Protein (g)': 0, 'Fat (g)': 0, 'Carbs (g)': 0, 
        'Fiber (g)': 0, 'Sugar (g)': 0, 'Sodium (mg)': 0, 'Cholesterol (mg)': 0,
        'Saturated Fat (g)': 0, 'Potassium (mg)': 0, 'Calcium (mg)': 0
    }
    
    lines = user_input.split(',')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Use regex to find amount and food name
        match = re.match(r'(\d+)\s*(\w+\s*\w*)?\s*(.*)', line)
        if match:
            amount = float(match.group(1))
            unit_keyword = (match.group(2) or "").lower()
            food_name = match.group(3).strip().lower()
        else:
            # If pattern doesn't match (e.g., just "apple"), assume quantity 1
            amount = 1.0
            food_name = line.lower()
            unit_keyword = ""
            
        # Find the food in the database
        food_item = find_food_item(food_name, unit_keyword, database_df)
        
        if food_item is not None:
            # Add the nutrition values for the amount specified
            for nutrient in totals.keys():
                if nutrient in food_item:
                    totals[nutrient] += amount * food_item[nutrient]
        else:
            print(f"Warning: Could not find '{food_name}' in the database. Skipping.")
            
    return totals

# Helper function to find a food item in the database
def find_food_item(food_name, unit_keyword, database_df):
    # Make a lowercase copy for case-insensitive search
    db_lower = database_df.copy()
    db_lower['name_lower'] = db_lower['Name'].str.lower()
    
    # First, try to find by name
    possible_foods = db_lower[db_lower['name_lower'].str.contains(food_name, na=False)]
    
    if len(possible_foods) == 0:
        return None
        
    # If we found matches, try to match the unit keyword if provided
    if unit_keyword:
        for _, food in possible_foods.iterrows():
            if unit_keyword in food['Unit'].lower():
                return food
                
    # If no unit match or no keyword, return the first match
    return possible_foods.iloc[0]

# Calculate percentages of daily recommendations
def calculate_percentages(totals, recommendations):
    """Calculate nutrient values as percentages of daily recommendations"""
    percentages = {}
    for nutrient, value in totals.items():
        if nutrient in recommendations and recommendations[nutrient] > 0:
            percentages[nutrient] = min(100, (value / recommendations[nutrient]) * 100)
        else:
            percentages[nutrient] = 0
    return percentages