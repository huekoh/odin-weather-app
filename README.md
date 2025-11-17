# Weather Forecast App

A dynamic weather forecast application that allows users to search for weather information by location and toggle between Fahrenheit and Celsius. The UI adapts based on current weather data.

## Features Usage

1. Enter a city name or location in the search bar
2. Press Enter or click the search button
3. View current weather conditions and forecast
4. Click the temperature toggle to switch between °F and °C
5. Watch the UI theme adapt to the current weather conditions

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/huekoh/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Visual Crossing API key:
```
API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## API Key

This project uses the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api). You'll need to:

1. Sign up for a free account at Visual Crossing
2. Get your API key from the account dashboard
3. Add it to your `.env` file (see Setup & Installation)

## Project Structure

```
odin-weather-app/
├── assets/
├── dist/                 # Production build (generated)
├── src/
│   ├── controller.js     # Main application entry point
│   ├── global.css        # Styling
│   ├── template.html     # HTML template
│   ├── view.js           # DOM manipulation
│   └── weather.js        # Weather API calls
├── webpack.common.js     # Webpack configurations
├── webpack.dev.js
├── webpack.prod.js
├── package.json
└── README.md
```

## Learning Objectives

This project was built as part of [The Odin Project](https://www.theodinproject.com/) curriculum to practice:

- Working with external APIs
- Asynchronous JavaScript (Promises & async/await)
- Webpack configuration and module bundling
- Dynamic DOM manipulation
- Responsive web design
- Git workflow and GitHub Pages deployment

## Technologies Used

- **JavaScript (ES6+)** - Core application logic with async/await
- **Webpack** - Module bundling and build process
- **Visual Crossing Weather API** - Real-time weather data
- **HTML5 & CSS3** - Structure and styling
- **Git & GitHub Pages** - Version control and deployment

## Acknowledgments

- Weather data provided by [Visual Crossing Weather API](https://www.visualcrossing.com/)
- Project inspiration from [The Odin Project](https://www.theodinproject.com/)

## License

MIT License - feel free to use this project for learning purposes.
