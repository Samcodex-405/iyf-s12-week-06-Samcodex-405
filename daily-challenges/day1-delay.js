// Day 1: a Promise that resolves after ms milliseconds.
// Run: node daily-challenges/day1-delay.js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log("Waiting 2 seconds…");
    await delay(2000);
    console.log("This prints after 2 seconds");
}

main();
