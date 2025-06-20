# Vite Weather Voice App
![Alt text for the image](C:\Users\vasu2\OneDrive\VS Code\weather-app\Screenshot (102).png "Optional title for the image")

## 🚀 Overview

The **Vite Weather Voice App** is a responsive web application designed to provide real-time weather information simply by listening to your voice commands. Built with **Vite** for a blazing-fast development experience, this app offers a clean and intuitive interface for quick weather lookups.

## ✨ Features

* **Voice-Activated Weather:** Speak your queries (e.g., "What's the weather in London?", "Tell me the temperature in New York") to get instant weather updates.
* **Real-time Data:** Fetches current weather conditions and forecasts from a reliable external API.
* **Clean & Responsive UI:** Designed with plain CSS for a straightforward and adaptive user experience across various devices.
* **Efficient Development Workflow:** Leverages Vite for fast cold starts and hot module reloading.

## 🛠️ Technologies Used

* **Frontend:** Vanilla JavaScript
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Voice Recognition:** Web Speech API (Browser's built-in)
* **Weather API:** [Your specific Weather API, e.g., OpenWeatherMap, WeatherAPI.com]
* **Styling:** Pure CSS
* **HTML5**

## 📦 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/) (LTS version recommended)
* [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Harshitha2807/vite-weather-voice-app.git](https://github.com/Harshitha2807/vite-weather-voice-app.git)
    cd vite-weather-voice-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Set up API Keys (IMPORTANT):**
    * This application requires an API key for the weather service.
    * Create a file named `.env` in the root of your project (the same directory as `package.json`).
    * Add your weather API key to this file. **Replace `YOUR_WEATHER_API_KEY_HERE` with your actual key.**
        ```dotenv
        # .env
        VITE_WEATHER_API_KEY=YOUR_WEATHER_API_KEY_HERE
        ```
    * **Note:** In Vite, environment variables accessible in your client-side code must be prefixed with `VITE_`. Make sure your `script.js` uses `import.meta.env.VITE_WEATHER_API_KEY` to access it.

4.  **Run the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```
    Your app should now be running at `http://localhost:5173` (or a similar port).

5.  **Build for production (optional):**
    ```bash
    npm run build
    # OR
    yarn build
    ```
    This command compiles and optimizes your application for production, creating static assets in the `dist` directory.

## 💡 Usage

Once the application is running in your browser:

1.  **Grant Microphone Access:** Your browser will likely prompt you to allow microphone access. Please allow it for the voice commands to work.
2.  **Activate Voice Input:** Click on the designated button (e.g., a microphone icon or "Start Voice Input") in the app's interface to activate listening.
3.  **Speak Your Query:** Clearly state your weather query. Examples:
    * "Weather in Paris"
    * "What's the temperature in Tokyo?"
    * "Tell me the forecast for New Delhi"
4.  **View Results:** The application will process your command and display the relevant weather information on the screen.

## 🤝 Contributing

Contributions are always welcome! If you have suggestions for new features, improvements, or find a bug, please consider:

1.  Forking this repository.
2.  Creating a new branch (`git checkout -b feature/your-feature-name` or `fix/bug-description`).
3.  Making your changes.
4.  Committing your changes (`git commit -m 'feat: Add awesome new feature'` or `fix: Resolve critical bug'`).
5.  Pushing to the branch (`git push origin feature/your-feature-name`).
6.  Opening a Pull Request.

Please ensure your code adheres to a consistent style and, if applicable, includes relevant tests.

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

---
