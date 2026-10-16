# Postman API Testing Practice

A Postman collection with 14 requests (29 checks) for the public **Restful Booker** practice API, plus the test cases and one bug report.

**Note:** This is a learning project on a public practice API. It is not client work.

## What is inside

| Path | What it is |
|---|---|
| `postman/restful-booker.postman_collection.json` | Import this into Postman |
| `docs/TEST_CASES.md` | All test cases with expected and actual results |
| `docs/BUG_REPORT.md` | One bug found: 500 instead of 400 for missing fields |
| `evidence/run-results.md` | Result of a run of all checks (HTTP status and response time) |
| `scripts/` | Test list, collection builder and a command line runner |

## How to use in Postman

1. Open Postman, click **Import**, choose `postman/restful-booker.postman_collection.json`.
2. Open the collection, click **Run** and run all requests in order. Requests depend on each other: `TC02` saves the token and `TC04` saves the booking id.
3. Expected: 28 of 29 checks pass. The one failing check (`TC12`) is the real bug in `docs/BUG_REPORT.md`.

## What is covered

- GET, POST, PUT, PATCH, DELETE
- Token login and requests with and without a token (403 checks)
- Positive and negative cases, status codes, response body checks
- Saving values between requests (collection variables)

## About the evidence

`evidence/run-results.md` was produced by `scripts/run_checks.js`, which runs the same requests and the same checks from the command line (Node 18 or newer):

```
node scripts/run_checks.js
```

Because this is a public shared server, results can change if the server changes. To rebuild the collection file from the test list: `node scripts/build_collection.js`.

## Author

Nikhil Pratap Singh, manual QA fresher, New Delhi.
