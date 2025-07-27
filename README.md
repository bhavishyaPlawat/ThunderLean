# ThunderLean: AI-Powered Fitness & Calorie Tracker

ThunderLean is a modern web application designed to simplify fitness tracking. It leverages AI to provide smart insights into your meals and helps you manage your caloric intake and expenditure effortlessly.

## ✨ Features

Our application is packed with features to help you on your fitness journey:

* **AI Calorie Tracker**: Simply describe your meal, and our Gemini-powered AI will estimate its nutritional content (calories, protein, carbs, and fat).
* **TDEE Calculator**: Calculate your Total Daily Energy Expenditure (TDEE) to understand your maintenance, weight loss, and weight gain calorie targets.
* **Interactive Dashboard**: A comprehensive dashboard to visualize your daily nutrition, track your progress over time with an interactive calendar, and see your goal progress at a glance.
* **Personalized Tips**: Get tailored advice to achieve your fitness goals, whether it's weight loss, weight gain, or muscle building.

## 🛠️ Tech Stack

This project is a monorepo containing both the frontend and backend applications.

### Frontend (Client-Side)

* **Framework**: [React](https://reactjs.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Routing**: [React Router](https://reactrouter.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Charts**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
* **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (Server-Side)

* **Framework**: [Express.js](https://expressjs.com/)
* **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv)
* **API Communication**: [Axios](https://axios-http.com/) for requests to the Gemini API
* **Middleware**: [CORS](https://www.npmjs.com/package/cors), [Helmet](https://helmetjs.github.io/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.0.0 or higher)
* npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/thunderlean.git](https://github.com/your-username/thunderlean.git)
    cd thunderlean
    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory:
        ```sh
        cd Backend
        ```
    * Install NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `Backend` directory and add your Google Gemini API key:
        ```
        GEMINI_API_KEY=YOUR_API_KEY_HERE
        PORT=8080
        ```
    * Start the backend server:
        ```sh
        node app.js
        ```
        The server will be running at `http://localhost:8080`.

3.  **Setup the Frontend:**
    * In a new terminal, navigate to the frontend directory:
        ```sh
        cd frontend
        ```
    * Install NPM packages:
        ```sh
        npm install
        ```
    * Start the frontend development server:
        ```sh
        npm run dev
        ```
        The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests to us.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
