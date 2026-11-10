// API_KEY is NOT declared here — it comes from config.js (git-ignored), loaded first.
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const HISTORY_KEY = "recent";
const MAX_HISTORY = 5;

// DOM elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

async function getWeather(city) {
    if (typeof API_KEY === "undefined" || !API_KEY) {
        showError("No API key found. Copy config.example.js to config.js and add your key.");
        return;
    }

    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        // fetch does NOT reject on 404/401, so check response.ok ourselves
        if (!response.ok) {
            if (response.status === 404) throw new Error(`City "${city}" not found. Check the spelling and try again.`);
            if (response.status === 401) throw new Error("API key not valid yet — new keys can take up to 2 hours to activate.");
            throw new Error("Failed to fetch weather data. Please try again.");
        }

        const data = await response.json();
        displayWeather(data);
        saveToHistory(data.name);
    } catch (err) {
        // fetch rejects with a TypeError only when there is no network at all
        weatherDisplay.classList.add("hidden");
        showError(err.name === "TypeError" ? "Network error — check your internet connection." : err.message);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    const { name, sys, main, weather, wind: windData } = data;
    const condition = weather[0];

    cityName.textContent = `${name}, ${sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
    weatherIcon.alt = condition.description;
    temperature.textContent = `${Math.round(main.temp)}°C`;
    description.textContent = condition.description;
    feelsLike.textContent = `${Math.round(main.feels_like)}°C`;
    humidity.textContent = `${main.humidity}%`;
    wind.textContent = `${windData.speed} m/s`;
    pressure.textContent = `${main.pressure} hPa`;

    // Bonus: background follows the weather
    document.body.dataset.weather = condition.main.toLowerCase();

    weatherDisplay.classList.remove("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function readHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem(HISTORY_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveToHistory(city) {
    // newest first, no duplicates (case-insensitive), max 5
    const recent = readHistory().filter(c => c.toLowerCase() !== city.toLowerCase());
    recent.unshift(city);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(recent.slice(0, MAX_HISTORY)));
    loadHistory();
}

function loadHistory() {
    const recent = readHistory();
    historyList.innerHTML = "";

    if (recent.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "Cities you search will show up here.";
        historyList.appendChild(empty);
        return;
    }

    recent.forEach(city => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = city;               // textContent: never inject typed text as HTML
        btn.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });
        li.appendChild(btn);
        historyList.appendChild(li);
    });
}

// Pressing Enter or clicking Search both fire "submit"
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

loadHistory();
