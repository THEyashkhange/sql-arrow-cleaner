import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SAMPLE = `DELIMITER //

CREATE PROCEDURE update_salary(IN p_emp_id INT)
BEGIN
    SELECT designation INTO v_designation
    FROM employee
    WHERE Emp_ID = p_emp_id;

    IF v_designation = 'Manager' THEN
        SET v_increment = 15.00;
    ELSEIF v_designation = 'Senior Software Engineer' THEN
        SET v_increment = 12.00;
    ELSEIF v_designation = 'Software Engineer' THEN
        SET v_increment = 10.00;
    ELSE
        SET v_increment = 5.00;
    END IF;

    UPDATE employee
    -> SET salary = salary + (salary * v_increment / 100)
    -> WHERE Emp_ID = p_emp_id;

    SELECT Emp_ID,
    -> emp_name,
    -> salary AS updated_salary
    -> FROM employee
    -> WHERE Emp_ID = p_emp_id;
END //

DELIMITER ;`;

function cleanSql(input) {
  return input
    .split("\n")
    .map((line) =>
      line
        .replace(/^\s*mysql>\s?/, "")
        .replace(/^\s*->\s?/, "")
        .replace(/^\s*=>\s?/, "")
    )
    .join("\n");
}

function App() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => cleanSql(input), [input]);

  const arrowCount = useMemo(() => {
    return input.split("\n").filter((line) => /^\s*(?:->|=>)\s?/.test(line)).length;
  }, [input]);

  const handleCopy = async () => {
    if (!output.trim()) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const loadSample = () => setInput(SAMPLE);
  const clearAll = () => {
    setInput("");
    setCopied(false);
  };

  return (
    <main className="app">
      <nav className="nav">
        <div className="brand">
          <div className="brand-mark">&gt;_</div>
          <div>
            <div className="brand-name">SQL Arrow Cleaner</div>
            <div className="brand-sub">Clean terminal prompts. Copy clean SQL.</div>
          </div>
        </div>
        <span className="badge">100% browser-based</span>
      </nav>

      <section className="hero">
        <div className="eyebrow">SQL LAB TOOL</div>
        <h1>Remove those annoying <span>→ arrows</span> automatically.</h1>
        <p>
          Paste SQL copied from a terminal, screenshot-to-text tool, or class notes.
          The app removes continuation prompts at the start of lines without changing your SQL.
        </p>
      </section>

      <section className="workspace">
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Paste SQL</h2>
              <span>Input</span>
            </div>
            <button className="ghost" onClick={loadSample}>Try example</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Paste your SQL here...\n\nExample:\n-> SELECT * FROM employee;"}
            spellCheck="false"
          />
          <div className="panel-foot">
            <span>{input.length} characters · {arrowCount} prompt arrow{arrowCount === 1 ? "" : "s"} found</span>
            <button className="clear" onClick={clearAll}>Clear</button>
          </div>
        </div>

        <div className="swap">→</div>

        <div className="panel output-panel">
          <div className="panel-head">
            <div>
              <h2>Clean SQL</h2>
              <span>Output</span>
            </div>
            <button className="copy" onClick={handleCopy} disabled={!output.trim()}>
              {copied ? "✓ Copied" : "Copy SQL"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Your cleaned query will appear here..."
            spellCheck="false"
          />
          <div className="panel-foot">
            <span>{output.length} characters · Ready to paste</span>
            <span className="safe">No server upload</span>
          </div>
        </div>
      </section>

      <section className="how">
        <h2>How it works</h2>
        <div className="steps">
          <div><b>01</b><span>Paste the SQL copied from your terminal.</span></div>
          <div><b>02</b><span>Continuation arrows at the beginning of lines are removed.</span></div>
          <div><b>03</b><span>Click <strong>Copy SQL</strong> and paste directly into MySQL.</span></div>
        </div>
      </section>

      <footer>
        Built for quick SQL lab work · Your query stays in your browser
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
