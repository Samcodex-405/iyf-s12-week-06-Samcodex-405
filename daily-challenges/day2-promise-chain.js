// Day 2: chain 3 promises, each with a random delay, and time the total.
// Run: node daily-challenges/day2-promise-chain.js
function randomDelay(label, value) {
    const ms = Math.floor(Math.random() * 1000) + 500; // 500–1500ms
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${label} finished after ${ms}ms`);
            resolve(value);
        }, ms);
    });
}

const stepOne = () => randomDelay("Step 1", 1);
const stepTwo = n => randomDelay("Step 2", n + 1);
const stepThree = n => randomDelay("Step 3", n + 1);

const start = Date.now();

stepOne()
    .then(stepTwo)
    .then(stepThree)
    .then(result => {
        console.log(`Final value: ${result}`);
        console.log(`Total time: ${Date.now() - start}ms (the sum of all three delays)`);
    })
    .catch(err => console.error("Chain failed:", err.message));
