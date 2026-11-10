// Lesson 11 practice — run with: node async-practice.js

// ---------- Task 11.1: predict the output ----------
// A, C, E print first (synchronous). Then B (0ms timer, still goes to the queue), then D (100ms).
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");
// Order: A, C, E, B, D

// ---------- Callback version ----------
function loadUser(userId, callback) {
    setTimeout(() => callback({ id: userId, name: "John" }), 1500);
}

// ---------- Task 11.2: Promise versions ----------
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) resolve({ id: userId, name: "John" });
            else reject(new Error("Invalid user ID"));
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 1, title: "Post 1", userId },
            { id: 2, title: "Post 2", userId }
        ]), 1000);
    });
}

function getPostComments(postId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 1, text: "Great post!", postId },
            { id: 2, text: "Thanks for sharing", postId }
        ]), 1000);
    });
}

// ---------- Task 11.3: chaining, Promise.all, Promise.race ----------
function chainDemo() {
    return getUserData(1)
        .then(user => { console.log("[chain] User:", user); return getUserPosts(user.id); })
        .then(posts => { console.log("[chain] Posts:", posts); return getPostComments(posts[0].id); })
        .then(comments => console.log("[chain] Comments:", comments))
        .catch(err => console.error("[chain] Error:", err.message));
}

async function threeUsersAtOnce() {
    const users = await Promise.all([getUserData(1), getUserData(2), getUserData(3)]);
    console.log("[all] Users:", users);
}

async function raceDemo() {
    const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
    const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));
    console.log("[race] Winner:", await Promise.race([fast, slow]));
}

// ---------- Task 11.4: async/await + try/catch ----------
// The callback-hell example, rewritten flat:
async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return { user, posts, comments };
}

async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("[async] Failed to fetch:", error.message);
        throw error; // re-throw so the caller can decide
    }
}

// ---------- Run everything in order ----------
async function main() {
    await new Promise(r => setTimeout(r, 300)); // let the prediction exercise finish first

    loadUser(7, user => console.log("[callback] Loaded:", user));
    await new Promise(r => setTimeout(r, 1600));

    await chainDemo();
    await threeUsersAtOnce();
    await raceDemo();

    console.log("[async] Flat version:", await getDataWithAsync());

    try {
        await fetchUserData(-1);
    } catch {
        console.log("[async] Caller handled the re-thrown error.");
    }
}

main();
