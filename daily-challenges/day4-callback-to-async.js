// Day 4: rewrite callback code with async/await.
// Run: node daily-challenges/day4-callback-to-async.js

// ---------- BEFORE: callbacks ----------
function getOrder(orderId, callback) {
    setTimeout(() => callback(null, { id: orderId, customerId: 42 }), 500);
}
function getCustomer(customerId, callback) {
    setTimeout(() => callback(null, { id: customerId, name: "Amina" }), 500);
}

function showOrderWithCallbacks(orderId) {
    getOrder(orderId, (err, order) => {
        if (err) return console.error(err);
        getCustomer(order.customerId, (err2, customer) => {
            if (err2) return console.error(err2);
            console.log("[callbacks]", `Order ${order.id} belongs to ${customer.name}`);
        });
    });
}

// ---------- AFTER: promises + async/await ----------
const getOrderAsync = orderId =>
    new Promise((resolve, reject) =>
        getOrder(orderId, (err, order) => (err ? reject(err) : resolve(order))));

const getCustomerAsync = customerId =>
    new Promise((resolve, reject) =>
        getCustomer(customerId, (err, customer) => (err ? reject(err) : resolve(customer))));

async function showOrderWithAsync(orderId) {
    try {
        const order = await getOrderAsync(orderId);
        const customer = await getCustomerAsync(order.customerId);
        console.log("[async/await]", `Order ${order.id} belongs to ${customer.name}`);
    } catch (error) {
        console.error("Failed:", error);
    }
}

showOrderWithCallbacks(1);
setTimeout(() => showOrderWithAsync(1), 1500);
