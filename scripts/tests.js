// Single list of API test cases. Used by build_collection.js (Postman file)
// and run_checks.js (command line run that saves evidence).
// In `checks`, these variables exist: code (status code), json (parsed body or null), text (raw body), ms (response time).
const BASE = "https://restful-booker.herokuapp.com";
const validBooking = {
  firstname: "Nikhil", lastname: "Singh", totalprice: 500, depositpaid: true,
  bookingdates: { checkin: "2026-11-01", checkout: "2026-11-05" }, additionalneeds: "Breakfast"
};
const updatedBooking = { ...validBooking, firstname: "Nikhil", lastname: "Pratap", totalprice: 650 };

module.exports = { BASE, validBooking, updatedBooking, tests: [
  { id: "TC01", name: "Health check - GET /ping", method: "GET", path: "/ping",
    checks: [["Status is 201 (Created)", "code === 201"]] },
  { id: "TC02", name: "Create token - valid credentials", method: "POST", path: "/auth",
    body: { username: "admin", password: "password123" },
    checks: [["Status is 200", "code === 200"], ["Response has a token", "json && typeof json.token === 'string' && json.token.length > 0"]],
    save: { token: "json.token" } },
  { id: "TC03", name: "Create token - wrong password", method: "POST", path: "/auth",
    body: { username: "admin", password: "wrong" },
    checks: [["Status is 200 (API returns 200 even for bad login)", "code === 200"], ["Body says Bad credentials", "json && json.reason === 'Bad credentials'"], ["No token returned", "json && !json.token"]] },
  { id: "TC04", name: "Create booking - valid data", method: "POST", path: "/booking",
    body: "validBooking",
    checks: [["Status is 200", "code === 200"], ["bookingid is a number", "json && typeof json.bookingid === 'number'"],
             ["firstname saved correctly", "json && json.booking.firstname === 'Nikhil'"], ["totalprice saved correctly", "json && json.booking.totalprice === 500"],
             ["checkin date saved correctly", "json && json.booking.bookingdates.checkin === '2026-11-01'"]],
    save: { bookingId: "json.bookingid" } },
  { id: "TC05", name: "Get booking by id", method: "GET", path: "/booking/{{bookingId}}",
    checks: [["Status is 200", "code === 200"], ["lastname is Singh", "json && json.lastname === 'Singh'"], ["depositpaid is true", "json && json.depositpaid === true"]] },
  { id: "TC06", name: "Get booking ids - filter by lastname", method: "GET", path: "/booking?lastname=Singh",
    checks: [["Status is 200", "code === 200"], ["Response is an array", "Array.isArray(json)"], ["Every item has bookingid", "Array.isArray(json) && json.every(x => typeof x.bookingid === 'number')"]] },
  { id: "TC07", name: "Update booking (PUT) - with token", method: "PUT", path: "/booking/{{bookingId}}",
    headers: { Cookie: "token={{token}}", Accept: "application/json" }, body: "updatedBooking",
    checks: [["Status is 200", "code === 200"], ["lastname changed to Pratap", "json && json.lastname === 'Pratap'"], ["totalprice changed to 650", "json && json.totalprice === 650"]] },
  { id: "TC08", name: "Partial update (PATCH) - with token", method: "PATCH", path: "/booking/{{bookingId}}",
    headers: { Cookie: "token={{token}}", Accept: "application/json" }, body: { additionalneeds: "Late checkout" },
    checks: [["Status is 200", "code === 200"], ["additionalneeds changed", "json && json.additionalneeds === 'Late checkout'"], ["other fields unchanged (lastname still Pratap)", "json && json.lastname === 'Pratap'"]] },
  { id: "TC09", name: "Update booking (PUT) - without token", method: "PUT", path: "/booking/{{bookingId}}",
    headers: { Accept: "application/json" }, body: "updatedBooking",
    checks: [["Status is 403 (Forbidden)", "code === 403"]] },
  { id: "TC10", name: "Delete booking - without token", method: "DELETE", path: "/booking/{{bookingId}}",
    checks: [["Status is 403 (Forbidden)", "code === 403"]] },
  { id: "TC11", name: "Get booking - id that does not exist", method: "GET", path: "/booking/99999999",
    checks: [["Status is 404", "code === 404"]] },
  { id: "TC12", name: "Create booking - required fields missing", method: "POST", path: "/booking",
    body: { firstname: "Nikhil" },
    checks: [["Status is 400 (Bad Request) - expected by good API design", "code === 400"]],
    note: "Expected FAIL: server returns 500 instead of 400. See docs/BUG_REPORT.md" },
  { id: "TC13", name: "Delete booking - with token", method: "DELETE", path: "/booking/{{bookingId}}",
    headers: { Cookie: "token={{token}}" },
    checks: [["Status is 201 (this API returns 201 for delete)", "code === 201"]] },
  { id: "TC14", name: "Get booking after delete", method: "GET", path: "/booking/{{bookingId}}",
    checks: [["Status is 404", "code === 404"]] }
]};
