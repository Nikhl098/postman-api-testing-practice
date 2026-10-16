// Generates postman/restful-booker.postman_collection.json from tests.js
const fs = require("fs");
const { BASE, validBooking, updatedBooking, tests } = require("./tests");
const bodies = { validBooking, updatedBooking };
const items = tests.map(t => {
  const headers = Object.entries({ "Content-Type": "application/json", ...(t.headers || {}) }).map(([key, value]) => ({ key, value }));
  const body = t.body ? (typeof t.body === "string" ? bodies[t.body] : t.body) : null;
  const lines = [
    "const code = pm.response.code;",
    "let json = null; try { json = pm.response.json(); } catch (e) {}",
    "const text = pm.response.text();",
    ...t.checks.map(([n, expr]) => `pm.test(${JSON.stringify(t.id + ": " + n)}, function () { pm.expect(Boolean(${expr})).to.be.true; });`),
    ...Object.entries(t.save || {}).map(([v, expr]) => `pm.collectionVariables.set(${JSON.stringify(v)}, ${expr});`)
  ];
  const [p, q] = t.path.split("?");
  return {
    name: `${t.id} - ${t.name}`,
    request: {
      method: t.method, header: headers,
      ...(body ? { body: { mode: "raw", raw: JSON.stringify(body, null, 2), options: { raw: { language: "json" } } } } : {}),
      url: { raw: "{{baseUrl}}" + t.path, host: ["{{baseUrl}}"], path: p.split("/").filter(Boolean),
             ...(q ? { query: q.split("&").map(s => ({ key: s.split("=")[0], value: s.split("=")[1] })) } : {}) },
      ...(t.note ? { description: t.note } : {})
    },
    event: [{ listen: "test", script: { type: "text/javascript", exec: lines } }]
  };
});
const collection = {
  info: { name: "Restful Booker - API testing practice", schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
          description: "Practice collection for the public Restful Booker API. Run requests in order (folder Run). Author: Nikhil Pratap Singh." },
  variable: [{ key: "baseUrl", value: BASE }, { key: "token", value: "" }, { key: "bookingId", value: "" }],
  item: items
};
fs.mkdirSync("postman", { recursive: true });
fs.writeFileSync("postman/restful-booker.postman_collection.json", JSON.stringify(collection, null, 2) + "\n");
console.log("Wrote collection with " + items.length + " requests");
