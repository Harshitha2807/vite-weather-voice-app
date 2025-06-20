// Weather API configuration
const API_KEY = import.meta.env.VITE_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Weather icons mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// Main weather fetch function
async function fetchWeather() {
    const city = document.getElementById('search').value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeatherData(data);
        fetchForecast(city);
    } catch (error) {
        showError('Unable to fetch weather data. Please check the city name and try again.');
    }
}

// Display weather data
function displayWeatherData(data) {
    const weatherData = document.getElementById('weather-data');
    const icon = weatherIcons[data.weather[0].icon] || '🌤️';

    weatherData.innerHTML = `
        <div class="weather-header">
            <div>
                <div class="city-name">${data.name}, ${data.sys.country}</div>
                <div style="color: #666; margin-top: 5px;">${new Date().toLocaleDateString()}</div>
            </div>
            <div class="weather-icon">${icon}</div>
            <div class="temperature">${Math.round(data.main.temp)}°C</div>
        </div>

        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 1.2rem; color: #333; font-weight: 600;">
                ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
            </div>
            <div style="color: #666; margin-top: 5px;">
                Feels like ${Math.round(data.main.feels_like)}°C
            </div>
        </div>

        <div class="weather-details">
            <div class="detail-item">
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${data.main.humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Wind</div>
                <div class="detail-value">${data.wind.speed} m/s</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Pressure</div>
                <div class="detail-value">${data.main.pressure} hPa</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Visibility</div>
                <div class="detail-value">${data.visibility / 1000} km</div>
            </div>
        </div>
    `;

    weatherData.style.display = 'block';
}

// Fetch 5-day forecast
async function fetchForecast(city) {
    try {
        const response = await fetch(`${FORECAST_API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Display forecast data
function displayForecast(data) {
    const forecastContainer = document.createElement('div');
    forecastContainer.innerHTML = '<h3 style="margin: 20px 0 15px 0; color: #333;">5-Day Forecast</h3>';

    const forecastItems = document.createElement('div');
    forecastItems.className = 'forecast-container';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = weatherIcons[forecast.weather[0].icon] || '🌤️';

        forecastItems.innerHTML += `
            <div class="forecast-item">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
            </div>
        `;
    }

    forecastContainer.appendChild(forecastItems);
    document.getElementById('weather-data').appendChild(forecastContainer);
}

// Voice search functionality
function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        const feedback = document.getElementById('voice-feedback');
        feedback.style.display = 'block';
        feedback.textContent = 'Listening... Please speak the city name';

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('search').value = transcript;
            feedback.textContent = `Heard: "${transcript}" - Searching...`;
            setTimeout(() => {
                feedback.style.display = 'none';
                fetchWeather();
            }, 1000);
        };

        recognition.onerror = function (event) {
            feedback.textContent = 'Speech recognition error. Please try again.';
            setTimeout(() => feedback.style.display = 'none', 3000);
        };

        recognition.start();
    } else {
        alert('Speech recognition not supported in this browser');
    }
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
                    const data = await response.json();

                    document.getElementById('search').value = data.name;
                    displayWeatherData(data);
                    fetchForecast(data.name);
                } catch (error) {
                    showError('Unable to fetch weather for your location');
                }
            },
            (error) => {
                showError('Location access denied. Please enter a city manually.');
            }
        );
    } else {
        showError('Geolocation not supported by this browser');
    }
}

// Utility functions
function showLoading() {
    const weatherData = document.getElementById('weather-data');
    weatherData.innerHTML = '<div class="loading">Loading weather data...</div>';
    weatherData.style.display = 'block';
}

function showError(message) {
    const weatherData = document.getElementById('weather-data');
    weatherData.innerHTML = `<div class="error">${message}</div>`;
    weatherData.style.display = 'block';
}

// Enable Enter key to trigger search
document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

// Make functions accessible to global scope for onclick
window.fetchWeather = fetchWeather;
window.startVoiceSearch = startVoiceSearch;
window.getCurrentLocation = getCurrentLocation;
