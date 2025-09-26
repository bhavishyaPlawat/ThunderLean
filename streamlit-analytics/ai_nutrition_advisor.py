import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
import joblib
import warnings
warnings.filterwarnings('ignore')

class NutritionAI:
    def __init__(self, database_df):
        self.database_df = database_df
        self.scaler = StandardScaler()
        self.nutrient_columns = ['Calories', 'Protein (g)', 'Fat (g)', 'Carbs (g)', 
                                'Fiber (g)', 'Sugar (g)', 'Sodium (mg)', 'Cholesterol (mg)',
                                'Saturated Fat (g)', 'Potassium (mg)', 'Calcium (mg)']
        
    def preprocess_food_data(self):
        """Preprocess food data for ML models"""
        # Select numeric nutritional data
        nutritional_data = self.database_df[self.nutrient_columns].copy()
        
        # Handle missing values
        nutritional_data = nutritional_data.fillna(nutritional_data.mean())
        
        # Scale the data
        scaled_data = self.scaler.fit_transform(nutritional_data)
        
        return scaled_data, nutritional_data
    
    def cluster_foods(self, n_clusters=5):
        """Cluster foods based on nutritional profiles using K-means"""
        scaled_data, nutritional_data = self.preprocess_food_data()
        
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        clusters = kmeans.fit_predict(scaled_data)
        
        # Add cluster labels to the original dataframe
        clustered_df = self.database_df.copy()
        clustered_df['Nutrition_Cluster'] = clusters
        
        # Calculate cluster centroids (average nutritional profile)
        cluster_profiles = []
        for cluster_id in range(n_clusters):
            cluster_foods = clustered_df[clustered_df['Nutrition_Cluster'] == cluster_id]
            cluster_profile = cluster_foods[self.nutrient_columns].mean().to_dict()
            cluster_profile['Cluster'] = cluster_id
            cluster_profile['Food_Count'] = len(cluster_foods)
            cluster_profile['Example_Foods'] = cluster_foods['Name'].head(3).tolist()
            cluster_profiles.append(cluster_profile)
        
        return clustered_df, cluster_profiles
    
    def recommend_food_substitutions(self, current_food, target_nutrient, improvement_direction='increase'):
        """
        Recommend food substitutions to improve specific nutrient intake
        """
        # Get current food nutritional profile
        current_food_data = self.database_df[self.database_df['Name'] == current_food]
        if current_food_data.empty:
            return f"Food '{current_food}' not found in database."
        
        current_nutrient_value = current_food_data[target_nutrient].values[0]
        
        # Find similar foods with better nutrient profile
        similar_foods = self.database_df[
            (self.database_df['Category'] == current_food_data['Category'].values[0]) &
            (self.database_df['Name'] != current_food)
        ].copy()
        
        if improvement_direction == 'increase':
            better_foods = similar_foods[similar_foods[target_nutrient] > current_nutrient_value]
            better_foods = better_foods.sort_values(target_nutrient, ascending=False)
        else:  # decrease
            better_foods = similar_foods[similar_foods[target_nutrient] < current_nutrient_value]
            better_foods = better_foods.sort_values(target_nutrient, ascending=True)
        
        recommendations = []
        for _, food in better_foods.head(5).iterrows():
            improvement = food[target_nutrient] - current_nutrient_value
            improvement_pct = (improvement / current_nutrient_value) * 100 if current_nutrient_value > 0 else 0
            
            recommendations.append({
                'Food': food['Name'],
                'Unit': food['Unit'],
                'Current_Value': current_nutrient_value,
                'New_Value': food[target_nutrient],
                'Improvement': improvement,
                'Improvement_Percentage': improvement_pct,
                'Calories': food['Calories']
            })
        
        return recommendations
    
    def predict_meal_impact(self, meal_items, target_days=7):
        """
        Predict the impact of current meal pattern over time using simple forecasting
        """
        if not meal_items:
            return "No meal items provided for prediction."
        
        # Calculate current meal totals
        meal_totals = {}
        for nutrient in self.nutrient_columns:
            meal_totals[nutrient] = 0
        
        for item in meal_items:
            food_data = self.database_df.loc[item['index']]
            quantity = item['quantity']
            
            for nutrient in self.nutrient_columns:
                if nutrient in food_data:
                    meal_totals[nutrient] += quantity * food_data[nutrient]
        
        # Simple linear projection (this could be enhanced with proper time series models)
        projections = {}
        for nutrient, daily_value in meal_totals.items():
            weekly_total = daily_value * target_days
            monthly_total = daily_value * 30
            
            projections[nutrient] = {
                'Daily': daily_value,
                'Weekly': weekly_total,
                'Monthly': monthly_total,
                'Trend': 'Increasing' if daily_value > 0 else 'Stable'
            }
        
        return projections
    
    def detect_nutritional_patterns(self, meal_history_df):
        """
        Detect patterns in meal history data
        """
        if meal_history_df.empty:
            return "No meal history data available."
        
        patterns = {}
        
        # Pattern 1: Most frequent meal times
        patterns['meal_time_distribution'] = meal_history_df['Meal_Time'].value_counts().to_dict()
        
        # Pattern 2: Average nutritional intake per meal time
        patterns['avg_nutrition_by_meal'] = meal_history_df.groupby('Meal_Time')[self.nutrient_columns].mean().to_dict()
        
        # Pattern 3: Identify nutrient gaps
        daily_totals = meal_history_df.groupby('Date')[self.nutrient_columns].sum()
        avg_daily = daily_totals.mean()
        
        # Common nutritional targets (simplified)
        targets = {
            'Protein (g)': 50,
            'Fiber (g)': 25,
            'Calcium (mg)': 1000,
            'Sodium (mg)': 2300
        }
        
        gaps = {}
        for nutrient, target in targets.items():
            if nutrient in avg_daily:
                gap = target - avg_daily[nutrient]
                gaps[nutrient] = {
                    'Current_Avg': avg_daily[nutrient],
                    'Target': target,
                    'Gap': gap,
                    'Status': 'Adequate' if gap <= 0 else 'Deficient'
                }
        
        patterns['nutritional_gaps'] = gaps
        
        return patterns
    
    def generate_smart_recommendations(self, user_profile, meal_totals, meal_history=None):
        """
        Generate AI-powered smart recommendations based on user profile and meal patterns
        """
        recommendations = []
        
        # Rule-based AI recommendations
        age = user_profile.get('age', 30)
        weight = user_profile.get('weight', 70)
        activity_level = user_profile.get('activity_level', 'moderate')
        
        # Protein recommendation based on activity level
        protein_needs = {
            'sedentary': weight * 0.8,
            'light': weight * 1.0,
            'moderate': weight * 1.2,
            'active': weight * 1.4,
            'very_active': weight * 1.6
        }
        
        target_protein = protein_needs.get(activity_level.lower(), weight * 1.0)
        current_protein = meal_totals.get('Protein (g)', 0)
        
        if current_protein < target_protein * 0.8:
            recommendations.append({
                'type': 'protein_boost',
                'priority': 'high',
                'message': f'Consider increasing protein intake. Current: {current_protein:.1f}g, Target: {target_protein:.1f}g',
                'suggestions': ['Add lean meat', 'Include legumes', 'Try protein shakes']
            })
        
        # Fiber recommendation
        if meal_totals.get('Fiber (g)', 0) < 20:
            recommendations.append({
                'type': 'fiber_increase',
                'priority': 'medium',
                'message': 'Fiber intake could be improved for better digestion',
                'suggestions': ['Add more vegetables', 'Choose whole grains', 'Include fruits with skin']
            })
        
        # Sodium warning
        if meal_totals.get('Sodium (mg)', 0) > 2000:
            recommendations.append({
                'type': 'sodium_reduction',
                'priority': 'high',
                'message': 'Sodium intake is on the higher side',
                'suggestions': ['Choose low-sodium options', 'Use herbs instead of salt', 'Rinse canned foods']
            })
        
        # Calcium recommendation for specific age groups
        if age > 50 and meal_totals.get('Calcium (mg)', 0) < 800:
            recommendations.append({
                'type': 'calcium_boost',
                'priority': 'medium',
                'message': 'Calcium intake important for bone health',
                'suggestions': ['Add dairy products', 'Include leafy greens', 'Consider fortified foods']
            })
        
        # Sort by priority
        priority_order = {'high': 3, 'medium': 2, 'low': 1}
        recommendations.sort(key=lambda x: priority_order.get(x['priority'], 0), reverse=True)
        
        return recommendations

# Utility functions
def load_ai_model(database_df):
    """Initialize and return the AI nutrition advisor"""
    return NutritionAI(database_df)

def analyze_meal_balance(meal_totals, recommendations):
    """AI-powered meal balance analysis"""
    balance_score = 0
    max_score = 100
    
    # Macronutrient balance (40% of score)
    total_cals = meal_totals.get('Calories', 1)
    protein_ratio = (meal_totals.get('Protein (g)', 0) * 4) / total_cals
    carb_ratio = (meal_totals.get('Carbs (g)', 0) * 4) / total_cals
    fat_ratio = (meal_totals.get('Fat (g)', 0) * 9) / total_cals
    
    # Ideal ratios
    ideal_protein = 0.15
    ideal_carbs = 0.55
    ideal_fat = 0.30
    
    macro_balance = 100 - (abs(protein_ratio - ideal_protein) + 
                          abs(carb_ratio - ideal_carbs) + 
                          abs(fat_ratio - ideal_fat)) * 100
    
    balance_score += macro_balance * 0.4
    
    # Micronutrient adequacy (60% of score)
    micronutrients = ['Fiber (g)', 'Calcium (mg)']
    micro_score = 0
    
    for nutrient in micronutrients:
        if nutrient in meal_totals and nutrient in recommendations:
            adequacy = min(100, (meal_totals[nutrient] / recommendations[nutrient]) * 100)
            micro_score += adequacy
    
    balance_score += (micro_score / len(micronutrients)) * 0.6
    
    return max(0, min(100, balance_score))

# Example usage
if __name__ == "__main__":
    # Demo of how to use the AI module
    from calorie_calculator import load_database
    
    # Load database
    db_df = load_database()
    
    # Initialize AI advisor
    ai_advisor = NutritionAI(db_df)
    
    print("✅ AI Nutrition Advisor initialized successfully!")
    print(f"📊 Database contains {len(db_df)} food items")
    
    # Example: Cluster foods
    clustered_df, clusters = ai_advisor.cluster_foods()
    print(f"🎯 Foods clustered into {len(clusters)} nutritional groups")
    
    # Example: Food substitution recommendation
    substitutions = ai_advisor.recommend_food_substitutions('Bread (Whole Wheat)', 'Fiber (g)', 'increase')
    print("🔄 Food substitution recommendations generated")