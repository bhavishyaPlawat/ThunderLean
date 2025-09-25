import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from calorie_calculator import load_database, calculate_daily_recommendations, calculate_percentages
from ai_nutrition_advisor import load_ai_model, analyze_meal_balance
import sys
import os

# Set better default figure size for Streamlit
plt.rcParams['figure.figsize'] = [6, 6]
plt.rcParams['figure.dpi'] = 100

# Set the page title and layout
st.set_page_config(page_title="ThunderLean Analytics", layout="wide")
st.title("🍽️ ThunderLean Advanced Meal Analyzer")

# Load the food database
db_df = load_database()

# ---- NEW: User Profile Section ----
st.sidebar.header("👤 User Profile")

# User input for personalized recommendations
age = st.sidebar.number_input("Age", min_value=1, max_value=120, value=30)
weight = st.sidebar.number_input("Weight (kg)", min_value=30, max_value=200, value=70)
height = st.sidebar.number_input("Height (cm)", min_value=100, max_value=250, value=170)
gender = st.sidebar.selectbox("Gender", ["Male", "Female", "Other"])
activity_level = st.sidebar.selectbox(
    "Activity Level", 
    ["Sedentary", "Light", "Moderate", "Active", "Very Active"]
)

# Calculate daily recommendations
daily_recommendations = calculate_daily_recommendations(age, weight, height, gender, activity_level.lower())

# Display daily recommendations in sidebar
st.sidebar.subheader("📊 Daily Recommendations")
for nutrient, value in daily_recommendations.items():
    st.sidebar.write(f"**{nutrient}:** {value}")

# ---- NEW FUNCTIONS FOR ADVANCED FEATURES ----

def create_comprehensive_nutrient_chart(totals, recommendations):
    """Creates a comprehensive visualization of nutrient intake vs recommendations"""
    # Nutrients to display in the chart
    nutrients = ['Protein (g)', 'Fat (g)', 'Carbs (g)', 'Fiber (g)', 'Sodium (mg)', 'Calcium (mg)']
    
    # Calculate percentages
    percentages = calculate_percentages(totals, recommendations)
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    
    # Bar chart: Actual vs Recommended
    actual_values = [totals[n] for n in nutrients]
    recommended_values = [recommendations[n] for n in nutrients]
    
    x_pos = np.arange(len(nutrients))
    width = 0.35
    
    bars1 = ax1.bar(x_pos - width/2, actual_values, width, label='Actual', color='skyblue', alpha=0.7)
    bars2 = ax1.bar(x_pos + width/2, recommended_values, width, label='Recommended', color='lightcoral', alpha=0.7)
    
    ax1.set_xlabel('Nutrients')
    ax1.set_ylabel('Amount')
    ax1.set_title('Nutrient Intake vs Recommendations')
    ax1.set_xticks(x_pos)
    ax1.set_xticklabels([n.split('(')[0].strip() for n in nutrients], rotation=45)
    ax1.legend()
    
    # Add value labels on bars
    for bar, value in zip(bars1, actual_values):
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                f'{value:.1f}', ha='center', va='bottom', fontsize=8)
    
    # Pie chart: Macronutrient distribution
    macro_nutrients = ['Protein (g)', 'Fat (g)', 'Carbs (g)']
    macro_calories = [totals[n] * (4 if n != 'Fat (g)' else 9) for n in macro_nutrients]
    total_macro_cals = sum(macro_calories)
    
    if total_macro_cals > 0:
        labels = [f'{n.split("(")[0]}\n{macros/total_macro_cals*100:.1f}%' 
                 for n, macros in zip(macro_nutrients, macro_calories)]
        ax2.pie(macro_calories, labels=labels, autopct='%1.1f%%', startangle=90)
        ax2.set_title('Macronutrient Calorie Distribution')
    else:
        ax2.text(0.5, 0.5, 'No data', ha='center', va='center')
        ax2.set_title('Macronutrient Calorie Distribution')
    
    ax2.axis('equal')
    plt.tight_layout()
    return fig

def create_meal_history_chart(history_df):
    """Creates a compact line chart of nutrient intake by meal time."""
    # Group by Meal_Time and sum the nutrients
    meal_time_totals = history_df.groupby('Meal_Time').agg({
        'Protein (g)': 'sum',
        'Fat (g)': 'sum', 
        'Carbs (g)': 'sum',
        'Fiber (g)': 'sum',
        'Sugar (g)': 'sum'
    }).reset_index()

    # Create a compact plot
    fig, ax = plt.subplots(figsize=(8, 4))
    
    # Plot all lines
    ax.plot(meal_time_totals['Meal_Time'], meal_time_totals['Protein (g)'], 
            marker='o', label='Protein', linewidth=2, markersize=4)
    ax.plot(meal_time_totals['Meal_Time'], meal_time_totals['Fat (g)'], 
            marker='s', label='Fat', linewidth=2, markersize=4)
    ax.plot(meal_time_totals['Meal_Time'], meal_time_totals['Carbs (g)'], 
            marker='^', label='Carbs', linewidth=2, markersize=4)
    ax.plot(meal_time_totals['Meal_Time'], meal_time_totals['Fiber (g)'], 
            marker='d', label='Fiber', linewidth=2, markersize=4)
    ax.plot(meal_time_totals['Meal_Time'], meal_time_totals['Sugar (g)'], 
            marker='v', label='Sugar', linewidth=2, markersize=4)
    
    # Customize the plot for compactness
    ax.set_title('Nutrient Intake by Meal Time', fontsize=12, fontweight='bold')
    ax.set_xlabel('Meal Time', fontsize=10)
    ax.set_ylabel('Amount (g)', fontsize=10)
    ax.legend(fontsize=9, loc='best')
    ax.tick_params(axis='x', rotation=45, labelsize=9)
    ax.tick_params(axis='y', labelsize=9)
    ax.grid(alpha=0.3, linestyle='--')
    
    # Clean up borders
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_alpha(0.3)
    ax.spines['bottom'].set_alpha(0.3)
    
    plt.tight_layout()
    return fig

def calculate_diet_score(totals, recommendations):
    """Calculates a comprehensive diet quality score based on nutrient ratios."""
    total_cals = totals['Calories']
    if total_cals == 0:
        return 0
    
    # Calculate percentages of recommendations
    percentages = calculate_percentages(totals, recommendations)
    
    # Score components (0-1 scale)
    scores = []
    
    # Macronutrient balance (proximity to ideal ratios)
    protein_ratio = (totals['Protein (g)'] * 4) / total_cals if total_cals > 0 else 0
    carb_ratio = (totals['Carbs (g)'] * 4) / total_cals if total_cals > 0 else 0
    fat_ratio = (totals['Fat (g)'] * 9) / total_cals if total_cals > 0 else 0
    
    protein_score = max(0, 1 - abs(protein_ratio - 0.15) / 0.15)
    carb_score = max(0, 1 - abs(carb_ratio - 0.55) / 0.55)
    fat_score = max(0, 1 - abs(fat_ratio - 0.30) / 0.30)
    
    scores.extend([protein_score, carb_score, fat_score])
    
    # Micronutrient scores (based on percentage of recommendation)
    micronutrients = ['Fiber (g)', 'Calcium (mg)']
    for nutrient in micronutrients:
        score = min(1, percentages.get(nutrient, 0) / 100)
        scores.append(score)
    
    # Limit scores (lower is better for these)
    limit_nutrients = ['Sodium (mg)', 'Saturated Fat (g)', 'Sugar (g)', 'Cholesterol (mg)']
    for nutrient in limit_nutrients:
        score = max(0, 1 - (percentages.get(nutrient, 0) / 100))
        scores.append(score)
    
    # Final score (0-100 scale)
    final_score = sum(scores) / len(scores) * 100
    return round(final_score, 1)

def get_recommendation(totals, recommendations):
    """Provides personalized recommendations based on intake vs recommendations."""
    recommendations_list = []
    percentages = calculate_percentages(totals, recommendations)
    
    # Fiber recommendation
    if percentages['Fiber (g)'] < 80:
        recommendations_list.append("Add more fruits, vegetables, or whole grains for fiber.")
    
    # Sodium recommendation
    if percentages['Sodium (mg)'] > 100:
        recommendations_list.append("Your sodium intake is high. Choose low-sodium options.")
    
    # Protein recommendation
    if percentages['Protein (g)'] < 70:
        recommendations_list.append("Consider adding protein-rich foods like chicken, fish, or legumes.")
    
    # Calcium recommendation
    if percentages['Calcium (mg)'] < 70:
        recommendations_list.append("Increase calcium intake with dairy, leafy greens, or fortified foods.")
    
    # Saturated fat recommendation
    if percentages['Saturated Fat (g)'] > 100:
        recommendations_list.append("Reduce saturated fat intake for better heart health.")
    
    if not recommendations_list:
        return "Your meal is well-balanced! 🎉"
    
    return " ".join(recommendations_list)

# --- Improved User-Friendly Meal Calculator ---
st.header("🍎 Build Your Meal")

# Initialize session state to store choices
if 'meal_items' not in st.session_state:
    st.session_state.meal_items = []

# Step 1: Let the user select a Category first
category_list = sorted(db_df['Category'].unique().tolist())
selected_category = st.selectbox(
    "1. Choose a Food Category:",
    options=category_list,
    key='category_select',
    index=0
)

# Step 2: Filter foods based on the selected category
foods_in_category = db_df[db_df['Category'] == selected_category]
food_list_for_display = []

for index, row in foods_in_category.iterrows():
    # Enhanced display with more nutritional info
    display_name = f"{row['Name']} ({row['Unit']}) - {row['Calories']} cal | P:{row['Protein (g)']}g F:{row['Fat (g)']}g C:{row['Carbs (g)']}g"
    food_list_for_display.append((display_name, index))

# Step 3: Let the user select a food from the filtered category
if food_list_for_display:
    food_display_options = [item[0] for item in food_list_for_display]
    
    selected_food_display = st.selectbox(
        "2. Select a Food Item:",
        options=food_display_options,
        key='food_select',
        help="Choose from foods in the selected category"
    )
    
    # Step 4: Get the corresponding index for the selected food
    corresponding_index = None
    for disp, idx in food_list_for_display:
        if disp == selected_food_display:
            corresponding_index = idx
            break
    
    # Step 5: Quantity selector
    quantity = st.number_input(
        "3. Enter Quantity:",
        min_value=0.1,
        value=1.0,
        step=0.5,
        key='qty_select'
    )
    
    # Step 6: Add to meal button
    col1, col2 = st.columns([1, 4])
    with col1:
        if st.button("➕ Add to Meal", type="secondary"):
            if corresponding_index is not None:
                food_data = db_df.loc[corresponding_index]
                st.session_state.meal_items.append({
                    'index': corresponding_index,
                    'quantity': quantity,
                    'name': food_data['Name'],
                    'unit': food_data['Unit']
                })
                st.success(f"Added {quantity} x {food_data['Name']} to your meal!")
                st.rerun()
    
    with col2:
        if st.button("🗑️ Clear Meal", type="primary"):
            st.session_state.meal_items = []
            st.rerun()
else:
    st.warning("No foods found in this category.")

# Display the current meal items
if st.session_state.meal_items:
    st.subheader("📋 Your Meal Summary")
    meal_display_df = pd.DataFrame([{
        'Food': item['name'],
        'Quantity': item['quantity'],
        'Unit': item['unit']
    } for item in st.session_state.meal_items])
    
    st.dataframe(meal_display_df, use_container_width=True, hide_index=True)
    
    # Calculate totals
    if st.button("🧮 Calculate Total Nutrition", type="primary"):
        totals = {
            'Calories': 0, 'Protein (g)': 0, 'Fat (g)': 0, 'Carbs (g)': 0, 
            'Fiber (g)': 0, 'Sugar (g)': 0, 'Sodium (mg)': 0, 'Cholesterol (mg)': 0,
            'Saturated Fat (g)': 0, 'Potassium (mg)': 0, 'Calcium (mg)': 0
        }
        
        for item in st.session_state.meal_items:
            food_data = db_df.loc[item['index']]
            qty = item['quantity']
            
            for nutrient in totals.keys():
                if nutrient in food_data:
                    totals[nutrient] += qty * food_data[nutrient]
        
        # Display comprehensive results
        st.subheader("📊 Comprehensive Nutrition Analysis")
        
        # Create comprehensive visualization
        fig = create_comprehensive_nutrient_chart(totals, daily_recommendations)
        st.pyplot(fig)
        
        # Calculate and display diet score
        diet_score = calculate_diet_score(totals, daily_recommendations)
        st.metric("🏆 Diet Quality Score", f"{diet_score}/100")
        
        # Display detailed nutrient breakdown
        st.subheader("🔍 Detailed Nutrient Breakdown")
        
        # Create two columns for better layout
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**Macronutrients:**")
            for nutrient in ['Calories', 'Protein (g)', 'Fat (g)', 'Carbs (g)']:
                percentage = (totals[nutrient] / daily_recommendations[nutrient]) * 100
                st.progress(min(100, int(percentage)) / 100, 
                           text=f"{nutrient}: {totals[nutrient]:.1f} ({percentage:.1f}%)")
        
        with col2:
            st.write("**Micronutrients:**")
            for nutrient in ['Fiber (g)', 'Sodium (mg)', 'Calcium (mg)']:
                if nutrient in totals and nutrient in daily_recommendations:
                    percentage = (totals[nutrient] / daily_recommendations[nutrient]) * 100
                    st.progress(min(100, int(percentage)) / 100, 
                               text=f"{nutrient}: {totals[nutrient]:.1f} ({percentage:.1f}%)")
        
        # Display recommendations
        st.subheader("💡 Personalized Recommendations")
        recommendation = get_recommendation(totals, daily_recommendations)
        st.info(recommendation)

# --- NEW: AI Nutrition Advisor Section ---
# --- NEW: AI Nutrition Advisor Section ---
try:
    from ai_nutrition_advisor import load_ai_model, analyze_meal_balance
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False

if AI_AVAILABLE:
    # Initialize AI advisor
    ai_advisor = load_ai_model(db_df)
    
    st.header("🤖 AI Nutrition Advisor")
    
    # Use columns instead of expander to avoid nesting issues
    st.write("**Smart Meal Analysis**")
    
    if st.session_state.meal_items:
        # Calculate current totals (reuse your existing totals or recalculate)
        totals = {
            'Calories': 0, 'Protein (g)': 0, 'Fat (g)': 0, 'Carbs (g)': 0, 
            'Fiber (g)': 0, 'Sugar (g)': 0, 'Sodium (mg)': 0, 'Cholesterol (mg)': 0,
            'Saturated Fat (g)': 0, 'Potassium (mg)': 0, 'Calcium (mg)': 0
        }
        
        for item in st.session_state.meal_items:
            food_data = db_df.loc[item['index']]
            qty = item['quantity']
            
            for nutrient in totals.keys():
                if nutrient in food_data:
                    totals[nutrient] += qty * food_data[nutrient]
        
        # AI Analysis
        user_profile = {
            'age': age,
            'weight': weight,
            'height': height,
            'gender': gender,
            'activity_level': activity_level
        }
        
        # Get AI recommendations
        ai_recommendations = ai_advisor.generate_smart_recommendations(user_profile, totals)
        
        # AI Balance Score
        ai_balance_score = analyze_meal_balance(totals, daily_recommendations)
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric("🧠 AI Balance Score", f"{ai_balance_score}/100")
        with col2:
            st.metric("📊 Items Analyzed", len(st.session_state.meal_items))
        
        # Display AI recommendations
        st.subheader("💡 AI-Powered Recommendations")
        if ai_recommendations:
            for rec in ai_recommendations:
                # Use container instead of expander
                with st.container():
                    priority_color = {
                        'high': '🔴',
                        'medium': '🟡', 
                        'low': '🟢'
                    }
                    st.write(f"{priority_color.get(rec['priority'], '⚪')} **{rec['type'].replace('_', ' ').title()}** ({rec['priority']} priority)")
                    st.write(rec['message'])
                    st.write("**Suggestions:**", ", ".join(rec['suggestions']))
                    st.divider()
        else:
            st.success("🎉 AI analysis shows your meal is well-balanced!")
    
    else:
        st.info("👆 Build a meal above to get AI-powered analysis")
    
    # Food substitution feature - SEPARATE SECTION to avoid nesting
    st.subheader("🔄 Smart Food Substitutions")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        substitute_food = st.selectbox("Select food to substitute:", 
                                     options=db_df['Name'].unique(),
                                     key='substitute_food')
    with col2:
        target_nutrient = st.selectbox("Target nutrient:", 
                                     options=['Protein (g)', 'Fiber (g)', 'Calcium (mg)', 'Sugar (g)', 'Sodium (mg)'],
                                     key='target_nutrient')
    with col3:
        direction = st.selectbox("Goal:", options=['Increase', 'Decrease'], key='direction')
    
    if st.button("Find Smart Substitutions", key='find_subs'):
        with st.spinner("🤖 AI is finding the best substitutions..."):
            substitutions = ai_advisor.recommend_food_substitutions(
                substitute_food, target_nutrient, direction.lower()
            )
            
            if isinstance(substitutions, list):
                st.success(f"Found {len(substitutions)} better options!")
                st.write("**Top Substitutions:**")
                
                for i, sub in enumerate(substitutions[:5], 1):
                    # Use a card-like layout instead of expander
                    with st.container():
                        st.markdown(f"### #{i} {sub['Food']} ({sub['Unit']})")
                        
                        col1, col2, col3 = st.columns(3)
                        with col1:
                            st.metric("Target Nutrient", f"{sub['New_Value']:.1f}")
                            st.caption(f"vs {sub['Current_Value']:.1f} current")
                        with col2:
                            improvement_text = f"+{sub['Improvement']:.1f}" if sub['Improvement'] > 0 else f"{sub['Improvement']:.1f}"
                            st.metric("Improvement", improvement_text)
                            st.caption(f"{sub['Improvement_Percentage']:+.1f}%")
                        with col3:
                            st.metric("Calories", sub['Calories'])
                        
                        # Find the food in database for more info
                        food_info = db_df[db_df['Name'] == sub['Food']].iloc[0]
                        st.write(f"**Category:** {food_info['Category']} | **Meal Type:** {food_info['Meal_Type']}")
                        
                        # Add some visual separation
                        if i < len(substitutions[:5]):
                            st.markdown("---")
            else:
                st.error(substitutions)
else:
    st.sidebar.info("🔒 AI features disabled - add ai_nutrition_advisor.py")

# ⬆️⬆️⬆️ END OF AI SECTION ⬆️⬆️⬆️
# --- NEW SECTION: Enhanced Historical Meal Analysis ---
st.header("📈 Advanced Meal Analysis")
base_dir = os.path.dirname(__file__)
filepath = os.path.join(base_dir, 'sample_meal_history.csv')

# Provide sample file download
base_dir = os.path.dirname(__file__)
csv_path = os.path.join(base_dir, 'sample_meal_history.csv')



with open('sample_meal_history.csv', 'r') as f:
    st.download_button(
        label="📥 Download Sample CSV Template",
        data=f,
        file_name="sample_meal_history.csv",
        mime="text/csv",
        help="Use this template to log your meals and upload for analysis"
    )

uploaded_history = st.file_uploader("Upload your meal history CSV", type="csv", key="history_uploader")

if uploaded_history is not None:
    try:
        history_df = pd.read_csv(uploaded_history)
        st.success("✅ File uploaded successfully!")
        
        # Show data preview
        with st.expander("View Uploaded Data"):
            st.dataframe(history_df)
        
        # Create and display charts
        st.subheader("📊 Meal Time Analysis")
        chart_fig = create_meal_history_chart(history_df)
        st.pyplot(chart_fig)
        
        # Enhanced anomaly detection
        st.subheader("⚠️ Advanced Anomaly Detection")
        
        # Check multiple nutrients for anomalies
        anomalies = []
        nutrients_to_check = ['Sodium (mg)', 'Calories', 'Saturated Fat (g)', 'Sugar (g)']
        
        for nutrient in nutrients_to_check:
            if nutrient in history_df.columns:
                avg_value = history_df[nutrient].mean()
                high_days = history_df[history_df[nutrient] > avg_value * 1.5]
                if not high_days.empty:
                    anomalies.append(f"High {nutrient} intake detected on {len(high_days)} days")
        
        if anomalies:
            for anomaly in anomalies:
                st.warning(anomaly)
            st.write("Consider adjusting your food choices on these days.")
        else:
            st.success("No significant anomalies detected in your eating patterns.")
            
        # Daily totals analysis
        if 'Date' in history_df.columns:
            st.subheader("📅 Daily Intake Trends")
            daily_totals = history_df.groupby('Date').sum(numeric_only=True).reset_index()
            
            # Plot daily trends for key nutrients
            fig, ax = plt.subplots(figsize=(10, 6))
            nutrients_to_plot = ['Calories', 'Protein (g)', 'Fat (g)', 'Carbs (g)']
            
            for nutrient in nutrients_to_plot:
                if nutrient in daily_totals.columns:
                    ax.plot(daily_totals['Date'], daily_totals[nutrient], marker='o', label=nutrient)
            
            ax.set_title('Daily Nutrient Intake Trends')
            ax.set_xlabel('Date')
            ax.set_ylabel('Amount')
            ax.legend()
            ax.tick_params(axis='x', rotation=45)
            plt.tight_layout()
            st.pyplot(fig)
            
    except Exception as e:
        st.error(f"Error processing file: {e}")

# --- NEW: Food Database Explorer ---
st.header("🔍 Food Database Explorer")

with st.expander("Explore Complete Food Database"):
    # Add search functionality
    search_term = st.text_input("🔍 Search for foods by name:")
    
    if search_term:
        filtered_db = db_df[db_df['Name'].str.contains(search_term, case=False, na=False)]
    else:
        filtered_db = db_df
    
    # Add filters
    col1, col2 = st.columns(2)
    with col1:
        category_filter = st.multiselect(
            "Filter by Category:",
            options=db_df['Category'].unique(),
            default=[]
        )
    with col2:
        meal_type_filter = st.multiselect(
            "Filter by Meal Type:",
            options=db_df['Meal_Type'].unique(),
            default=[]
        )
    
    # Apply filters
    if category_filter:
        filtered_db = filtered_db[filtered_db['Category'].isin(category_filter)]
    if meal_type_filter:
        filtered_db = filtered_db[filtered_db['Meal_Type'].isin(meal_type_filter)]
    
    # Display filtered database
    st.dataframe(filtered_db, use_container_width=True)

st.success("✅ Ready to build your meal! Select a category above to start.")