// Day 3: fetch a user; on 404 return a default user instead of throwing.
// Run: node daily-challenges/day3-error-handling.js   (Node 18+ has fetch built in)
const DEFAULT_USER = { id: 0, name: "Guest User", email: "guest@example.com" };

async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (response.status === 404) {
            console.log(`User ${id} not found — using default user.`);
            return DEFAULT_USER;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch user:", error.message);
        return DEFAULT_USER; // network failure also falls back
    }
}

async function main() {
    console.log("Real user:", (await getUser(1)).name);
    console.log("Missing user:", (await getUser(9999)).name);
}

main();
