# ThunderLean: AI-Powered Fitness & Calorie Tracker

<p align="center">
  <img src="https://raw.githubusercontent.com/bhavishyaplawat/thunderlean/main/flash.png" alt="ThunderLean Logo" width="150"/>
</p>

<h3 align="center">
  Your intelligent partner for a healthier lifestyle.
</h3>

<p align="center">
  <a href="https://github.com/bhavishyaplawat/thunderlean/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/bhavishyaplawat/thunderlean?style=for-the-badge&logo=github&color=8C4DCF&labelColor=1F2937" alt="Star the repository"/>
  </a>
</p>

<p align="center">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/bhavishyaplawat/thunderlean?style=for-the-badge">
  <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/bhavishyaplawat/thunderlean?style=for-the-badge">
  
</p>

ThunderLean is a revolutionary web application that redefines your fitness journey. By harnessing the power of Artificial Intelligence, we provide you with smart, personalized insights into your meals, helping you to effortlessly manage your caloric intake and expenditure. Our goal is to make fitness tracking intuitive, accessible, and highly effective for everyone.

## ✨ Features

Our application is packed with a suite of features designed to support you every step of the way on your fitness journey:

* **🤖 AI Calorie Tracker**: Simply describe your meal or snap a picture, and our Gemini-powered AI will provide an estimate of its nutritional content, including calories, protein, carbs, and fat.
* **🧮 TDEE Calculator**: Determine your Total Daily Energy Expenditure (TDEE) to understand your body's needs. Get tailored calorie targets for maintaining, losing, or gaining weight.
* **📊 Interactive Dashboard**: A beautifully designed dashboard to visualize your daily nutrition, track your progress with an interactive calendar, and monitor your goals at a glance.
* **💡 Personalized Tips**: Receive customized advice to help you achieve your specific fitness goals, whether it's weight loss, weight gain, or muscle building.

## 🚀 Live Demo

<p align="center">
  <a href="https://thunder-lean.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/View_Live_Demo-8C4DCF?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

## 🛠️ Tech Stack

This project is a monorepo that includes both the frontend and backend applications, built with a modern and robust technology stack:

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
* **Image Upload**: [Multer](https://github.com/expressjs/multer)

## 🎯 Getting Started

To get a local copy of ThunderLean up and running, please follow these simple steps.

### Prerequisites

* Node.js (v18.0.0 or higher)
* npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/bhavishyaplawat/thunderlean.git](https://github.com/bhavishyaplawat/thunderlean.git)
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
        The application will be available at `http://localhost:5173`.

## 🤝 Contributing

Contributions are the lifeblood of the open-source community and are **greatly appreciated**. Your contributions will help make ThunderLean an even better tool for everyone.

Please see our `CONTRIBUTING.md` file for details on our code of conduct and the process for submitting pull requests to us.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## 🙏 Acknowledgments

* A big thank you to all the open-source libraries and tools that made this project possible.
* Inspiration and motivation from the fitness and tech communities.

---

<p align="center">
  Made with ❤️ by the ThunderLean Team
</p>
