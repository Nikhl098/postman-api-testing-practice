# Bug report: API returns 500 when required fields are missing

| Field | Value |
|---|---|
| ID | BUG-API-01 |
| Test case | TC12 |
| API | Restful Booker (public practice API), `POST /booking` |
| Severity | Minor (practice API, but a 500 for bad input is wrong behaviour) |
| Priority | Low |
| Found on | 2026-10-15 |
| Status | Open (not reported anywhere, practice API) |

## Steps to reproduce
1. Send `POST https://restful-booker.herokuapp.com/booking`
2. Header: `Content-Type: application/json`
3. Body: `{ "firstname": "Nikhil" }` (all other required fields missing)

## Expected result
A client error such as `400 Bad Request` with a message about the missing fields.

## Actual result
`500 Internal Server Error`, body: `Internal Server Error`.

## Why it matters
A 500 means the server failed, not that the input was wrong. The client cannot tell what to fix, and server errors are usually monitored as outages.

## Evidence
Check `TC12` in [evidence/run-results.md](../evidence/run-results.md): HTTP 500 returned, expected 400.
