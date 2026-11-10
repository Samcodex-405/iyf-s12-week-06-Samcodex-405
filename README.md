# Weather Dashboard — Week 6: Asynchronous JavaScript

A weather app that fetches live data from the [OpenWeatherMap API](https://openweathermap.org/api) using Promises, `async/await` and the Fetch API. Built for IYF Season 12, Week 6 (graded gate: JavaScript Proficient).

## Live Demo

https://samcodex-405.github.io/iyf-s12-week-06-samcodex-405/


## Features

- Search a city with the Search button or the Enter key
- Shows city and country, weather icon, temperature (°C), description, feels like, humidity, wind speed and pressure
- Shows "Loading…" while fetching
- Clear error messages for an unknown city, an invalid API key, and no internet connection
- Saves the last 5 searches in `localStorage`; click one to search again
- Bonus: the page background changes with the weather (clear, clouds, rain, thunderstorm, snow)

## Tech Used

- HTML, CSS and vanilla JavaScript (no frameworks)
- `async/await` with `try/catch/finally`
- Fetch API with `response.ok` checks (fetch does not reject on a 404 by itself)
- `localStorage` for search history
- GitHub Actions + GitHub Pages for deployment

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/Samcodex-405/iyf-s12-week-06-Samcodex-405.git
   cd iyf-s12-week-06-Samcodex-405
   ```
2. Copy `config.example.js` to `config.js`.
3. Open `config.js` and paste your OpenWeatherMap API key between the quotes. New keys can take up to 2 hours to activate.
4. Open `index.html` in your browser, or use the VS Code Live Server extension.

`config.js` is listed in `.gitignore`, so your real key is never committed.

## API Key Security

- The key lives only in `config.js`, which is git-ignored. It is never written in `app.js` or committed.
- `config.example.js` (committed) holds an empty key to show what file to create.
- For the live site, the key is stored as a GitHub repository secret named `OPENWEATHER_API_KEY`. The deploy workflow writes `config.js` during the build, so the key never enters git history.
- Limit: a front-end-only app still sends the key to the visitor's browser. A free-tier weather key is an acceptable risk here; a backend would remove it entirely.

## Deployment

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`:

1. Checks out the code
2. Writes `config.js` from the `OPENWEATHER_API_KEY` secret
3. Uploads the site and deploys it to GitHub Pages

To deploy your own copy: add the secret, set **Settings → Pages → Source** to **GitHub Actions**, and push to `main`.

## Project Structure

```
├── index.html                  Weather Dashboard page
├── styles.css                  Styling
├── app.js                      Fetch, display, error handling, history
├── config.example.js           Empty key template (committed)
├── config.js                   Real key (git-ignored, local only)
├── async-practice.js           Lesson 11: callbacks, promises, async/await
├── daily-challenges/           Five daily challenges (see its own README)
│   ├── day1-delay.js
│   ├── day2-promise-chain.js
│   ├── day3-error-handling.js
│   ├── day4-callback-to-async.js
│   └── day5-parallel-fetches.js
├── .github/workflows/deploy.yml
├── .gitignore
├── LICENSE
└── README.md
```

## Practice and Daily Challenges

- `async-practice.js` covers the Lesson 11 exercises. Run it with `node async-practice.js`.
- `daily-challenges/` has five small async challenges. See [daily-challenges/README.md](daily-challenges/README.md) for how to run each one.

## How the App Works

1. The form's `submit` event fires on a button click or Enter. The city is trimmed and passed to `getWeather()`.
2. `getWeather()` builds the URL with `encodeURIComponent(city)` and awaits `fetch`.
3. If `response.ok` is false, it throws a specific message: 404 for a city that is not found, 401 for an invalid key, or a general failure message otherwise.
4. On success the JSON is rendered into the page and the city is saved to history.
5. A `TypeError` (no network) is caught and shown as a network error, and `finally` always hides the loading message.

## What I Learned

- Synchronous vs asynchronous code, and how the event queue decides output order
- Moving from callbacks to Promises to `async/await`
- Why `response.ok` must be checked, and how `try/catch/finally` keeps the UI in the right state
- Keeping secrets out of git with `.gitignore` and repository secrets
- Deploying a static site with GitHub Actions and GitHub Pages