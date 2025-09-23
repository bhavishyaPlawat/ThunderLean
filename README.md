# Streamlit Analytics Dashboard

![Project Status](https://img.shields.io/badge/status-Completed-brightgreen)
![Python Version](https://img.shields.io/badge/python-3.11-blue)
![Streamlit](https://img.shields.io/badge/streamlit-1.30-orange)

This folder contains the **Streamlit Analytics Dashboard**, part of the ThunderLean repository. It provides interactive visualization and analytics for datasets using Python, Pandas, NumPy, and Streamlit.

---

## 🚀 Project Overview
The Streamlit Analytics Dashboard allows users to:
- Load and explore datasets interactively.
- Generate dynamic charts, graphs, and tables.
- Filter and aggregate data in real-time.
- Perform basic statistical analysis on the dataset.
- Export insights and summaries for reporting.

**Technologies used:**
- **Python 3.11**
- **Streamlit** – for building interactive dashboards
- **Pandas & NumPy** – for data processing and manipulation
- **Matplotlib & Seaborn** – for plotting visualizations
- **Git & GitHub** – version control and collaboration

---
# ⚡ Streamlit Analytics Dashboard – Execution Guide

This guide explains how to run and test **Streamlit Analytics Dashboard** contribution for ThunderLean (Phase 4).  

---

## 🖥️ Steps to Run the Project

### Clone the Repository
```bash
git clone https://github.com/vandita-yadav/ThunderLean.git
cd ThunderLean
```

### Checkout my branch
```bash
git checkout feature/streamlit-dashboard
```
### Navigate into my folder
```bash
cd streamlit-analytics
```
### (Optional) Create & Activate Virtual Environment
```bash
# For Windows
python -m venv venv
venv\Scripts\activate

# For Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the Streamlit App
```bash
streamlit run app.py
```
---

## 🗂 Folder Structure
```
streamlit-analytics/
│
├── app.py # Main Streamlit application
├── food_database.csv
├── sample_meal_history.csv
├── food_database.txt
├── calorie_calculator.py
├── ai_nutrition_advisor.py
├── requirements.txt
└── README.md # Project documentation
├── screenshots/ # Folder containing dashboard screenshots

```

---

## 📸 Screenshots
![Dashboard Screenshot 1](streamlit-analytics/screenshots/dashboard1.png)
![Dashboard Screenshot 2](streamlit-analytics/screenshots/dashboard2.png)
![Dashboard Screenshot 3](streamlit-analytics/screenshots/dashboard3.png)
![Dashboard Screenshot 4](streamlit-analytics/screenshots/dashboard4.png)
![Dashboard Screenshot 5](streamlit-analytics/screenshots/dashboard5.png)

---

### 📝 Usage
- Upload your dataset in CSV format.
- Use sidebar filters to explore data dynamically.
- Visualize trends with graphs and charts.
- Export processed data or insights using the provided options.

### 🤝 Contribution
If you find this project helpful, feel free to:
- Fork the repository.
- Submit issues or pull requests.

- Suggest improvements or report bugs.


