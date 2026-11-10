# Daily Challenges — Week 6: Asynchronous JavaScript

Five small challenges practising Promises, async/await and the Fetch API.

## How to Run

You need [Node.js](https://nodejs.org) 18 or newer (it has `fetch` built in). From the repository root:

```
node daily-challenges/day1-delay.js
node daily-challenges/day2-promise-chain.js
node daily-challenges/day3-error-handling.js
node daily-challenges/day4-callback-to-async.js
node daily-challenges/day5-parallel-fetches.js
```

Days 3 and 5 call the public [JSONPlaceholder](https://jsonplaceholder.typicode.com) API, so they need an internet connection. No API key is needed for any challenge.

## Challenges

| Day | File | Task | Key concepts |
|-----|------|------|--------------|
| 1 | `day1-delay.js` | Create `delay(ms)` that returns a promise resolving after `ms` milliseconds | `new Promise`, `setTimeout`, `await` |
| 2 | `day2-promise-chain.js` | Chain 3 promises with random delays and time the total | `.then()` chaining, returning values, `Date.now()` |
| 3 | `day3-error-handling.js` | Fetch a user; on a 404 return a default user instead of throwing | `try/catch`, `response.ok`, `response.status` |
| 4 | `day4-callback-to-async.js` | Rewrite callback-based code using async/await | Promisifying callbacks, flat async code |
| 5 | `day5-parallel-fetches.js` | Fetch 3 endpoints at once and show each result as it completes | `Promise.allSettled`, parallel requests |

## Day by Day

### Day 1: Delayed Promise
`delay(2000)` pauses an async function for 2 seconds without blocking the rest of the program.

Expected output:
```
Waiting 2 seconds…
This prints after 2 seconds
```

### Day 2: Promise Chain
Three functions each resolve after a random 500–1500ms delay. Each step passes its result to the next, and the total time is printed at the end. The total is roughly the sum of all three delays, because the steps run one after another.

### Day 3: Error Handling
`getUser(id)` returns the real user for `1` and a default "Guest User" for `9999` (a 404). Network failures also fall back to the default user instead of crashing. `fetch` does not reject on a 404, so the status is checked explicitly.

### Day 4: Rewrite with Async/Await
The same two-step lookup (order → customer) is written twice: first with nested callbacks, then with promisified helpers and `async/await`. The second version is flat, easier to read and handles errors in a single `try/catch`.

### Day 5: Parallel Fetches
Three endpoints (user, post, todo) are requested at the same time. Each request logs "Done" the moment it finishes. `Promise.allSettled` then reports every result, so one failed request does not hide the others, unlike `Promise.all`.

## What I Learned

- Async code does not block: the rest of the program keeps running while a timer or request is pending
- `async/await` reads like synchronous code but still runs asynchronously
- `fetch` only rejects on network failure, so HTTP errors need a `response.ok` check
- `Promise.all` fails fast; `Promise.allSettled` waits for everything and reports each outcome