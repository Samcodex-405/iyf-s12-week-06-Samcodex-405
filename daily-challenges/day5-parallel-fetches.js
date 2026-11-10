// Day 5: fetch 3 endpoints at once; show each result as it completes. Uses Promise.allSettled.
// Run: node daily-challenges/day5-parallel-fetches.js
const endpoints = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/todos/1"
];

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    const data = await response.json();
    // Display as soon as THIS request finishes, not when all are done
    console.log(`Done: ${url}`);
    return data;
}

async function main() {
    const results = await Promise.allSettled(endpoints.map(fetchJson));

    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`✔ ${endpoints[i]}`, result.value);
        } else {
            console.log(`✘ ${endpoints[i]} failed:`, result.reason.message);
        }
    });
}

main();
