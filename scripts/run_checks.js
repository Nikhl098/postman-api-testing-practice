// Runs the same test cases from the command line (Node 18+) and saves evidence.
// This is a helper; the main deliverable is the Postman collection.
const fs = require("fs");
const { BASE, validBooking, updatedBooking, tests } = require("./tests");
const bodies = { validBooking, updatedBooking };
(async () => {
  const vars = {}; const rows = []; let pass = 0, fail = 0;
  const fill = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k]);
  for (const t of tests) {
    const headers = { "Content-Type": "application/json", ...(t.headers || {}) };
    for (const k in headers) headers[k] = fill(headers[k]);
    const body = t.body ? JSON.stringify(typeof t.body === "string" ? bodies[t.body] : t.body) : undefined;
    const start = Date.now();
    const res = await fetch(BASE + fill(t.path), { method: t.method, headers, body });
    const text = await res.text(); const ms = Date.now() - start; const code = res.status;
    let json = null; try { json = JSON.parse(text); } catch (e) {}
    for (const [v, expr] of Object.entries(t.save || {})) vars[v] = eval(expr);
    for (const [n, expr] of t.checks) {
      const ok = Boolean(eval(expr)); ok ? pass++ : fail++;
      rows.push({ id: t.id, request: `${t.method} ${fill(t.path)}`, check: n, result: ok ? "PASS" : "FAIL", status: code, ms });
    }
  }
  const stamp = new Date().toISOString();
  let md = `# Run evidence\n\nRun on: ${stamp}\nAPI: ${BASE}\nChecks: ${pass + fail}, passed: ${pass}, failed: ${fail}\n\n| Test | Request | Check | Result | HTTP | ms |\n|---|---|---|---|---|---|\n`;
  for (const r of rows) md += `| ${r.id} | \`${r.request}\` | ${r.check} | ${r.result} | ${r.status} | ${r.ms} |\n`;
  fs.writeFileSync("evidence/run-results.md", md);
  console.log(md);
})();
