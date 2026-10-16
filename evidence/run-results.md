# Run evidence

Run on: 2026-10-15T18:35:10.991Z
API: https://restful-booker.herokuapp.com
Checks: 29, passed: 28, failed: 1

| Test | Request | Check | Result | HTTP | ms |
|---|---|---|---|---|---|
| TC01 | `GET /ping` | Status is 201 (Created) | PASS | 201 | 295 |
| TC02 | `POST /auth` | Status is 200 | PASS | 200 | 224 |
| TC02 | `POST /auth` | Response has a token | PASS | 200 | 224 |
| TC03 | `POST /auth` | Status is 200 (API returns 200 even for bad login) | PASS | 200 | 72 |
| TC03 | `POST /auth` | Body says Bad credentials | PASS | 200 | 72 |
| TC03 | `POST /auth` | No token returned | PASS | 200 | 72 |
| TC04 | `POST /booking` | Status is 200 | PASS | 200 | 71 |
| TC04 | `POST /booking` | bookingid is a number | PASS | 200 | 71 |
| TC04 | `POST /booking` | firstname saved correctly | PASS | 200 | 71 |
| TC04 | `POST /booking` | totalprice saved correctly | PASS | 200 | 71 |
| TC04 | `POST /booking` | checkin date saved correctly | PASS | 200 | 71 |
| TC05 | `GET /booking/2345` | Status is 200 | PASS | 200 | 73 |
| TC05 | `GET /booking/2345` | lastname is Singh | PASS | 200 | 73 |
| TC05 | `GET /booking/2345` | depositpaid is true | PASS | 200 | 73 |
| TC06 | `GET /booking?lastname=Singh` | Status is 200 | PASS | 200 | 70 |
| TC06 | `GET /booking?lastname=Singh` | Response is an array | PASS | 200 | 70 |
| TC06 | `GET /booking?lastname=Singh` | Every item has bookingid | PASS | 200 | 70 |
| TC07 | `PUT /booking/2345` | Status is 200 | PASS | 200 | 71 |
| TC07 | `PUT /booking/2345` | lastname changed to Pratap | PASS | 200 | 71 |
| TC07 | `PUT /booking/2345` | totalprice changed to 650 | PASS | 200 | 71 |
| TC08 | `PATCH /booking/2345` | Status is 200 | PASS | 200 | 70 |
| TC08 | `PATCH /booking/2345` | additionalneeds changed | PASS | 200 | 70 |
| TC08 | `PATCH /booking/2345` | other fields unchanged (lastname still Pratap) | PASS | 200 | 70 |
| TC09 | `PUT /booking/2345` | Status is 403 (Forbidden) | PASS | 403 | 72 |
| TC10 | `DELETE /booking/2345` | Status is 403 (Forbidden) | PASS | 403 | 69 |
| TC11 | `GET /booking/99999999` | Status is 404 | PASS | 404 | 71 |
| TC12 | `POST /booking` | Status is 400 (Bad Request) - expected by good API design | FAIL | 500 | 71 |
| TC13 | `DELETE /booking/2345` | Status is 201 (this API returns 201 for delete) | PASS | 201 | 70 |
| TC14 | `GET /booking/2345` | Status is 404 | PASS | 404 | 70 |
