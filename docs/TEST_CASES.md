# Test cases

API: https://restful-booker.herokuapp.com (public practice API, docs: https://restful-booker.herokuapp.com/apidoc/index.html)

| ID | Scenario | Type | Expected | Result on 2026-10-15 |
|---|---|---|---|---|
| TC01 | GET /ping health check | Positive | 201 | Pass |
| TC02 | POST /auth valid credentials | Positive | 200 + token | Pass |
| TC03 | POST /auth wrong password | Negative | "Bad credentials", no token (API still returns 200) | Pass |
| TC04 | POST /booking valid data | Positive | 200 + bookingid, saved values match | Pass |
| TC05 | GET /booking/{id} | Positive | 200, values match what was created | Pass |
| TC06 | GET /booking?lastname=Singh | Positive | 200, array of ids | Pass |
| TC07 | PUT /booking/{id} with token | Positive | 200, full record updated | Pass |
| TC08 | PATCH /booking/{id} with token | Positive | 200, only sent field changes | Pass |
| TC09 | PUT without token | Negative | 403 | Pass |
| TC10 | DELETE without token | Negative | 403 | Pass |
| TC11 | GET booking id that does not exist | Negative | 404 | Pass |
| TC12 | POST /booking with required fields missing | Negative | 400 | **Fail** (500), see [BUG_REPORT.md](BUG_REPORT.md) |
| TC13 | DELETE /booking/{id} with token | Positive | success (API returns 201) | Pass |
| TC14 | GET booking after delete | Negative | 404 | Pass |

Total: 29 checks across 14 requests, 28 passed, 1 failed.

## Notes
- The API is shared and public, so anyone can create or change data. The tests only touch the booking they create themselves.
- Some status codes are unusual for this API (201 for `/ping` and for delete, 200 for bad login). I tested against what the API documents and returns, and noted them in the check names.
