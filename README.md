# RowProof Demonstration Repository (`rowproof-demo`)

This repository demonstrates the real-world usage of the published [**RowProof** npm package](https://www.npmjs.com/package/rowproof) ([Source Code](https://github.com/harshhh-08/rowproof)).

> **Tagline:** Validate your rows. Trust your data.

---

## What this demo covers

1. **Clean CSV Validation**: Validating a student record file where all rows and types are correct.
2. **Dirty CSV Detection**: Catching:
   - Missing required values
   - Invalid data types
   - Duplicate records
   - Duplicate unique emails
   - Empty rows
3. **Missing Column Validation**: Detecting when a required header is absent from the CSV.
4. **Report Exporting**: Automatically exporting validation results to a structured `validation-report.json`.

---

## Installation & Running the Demo

1. Clone this repository:
   ```bash
   git clone https://github.com/harshhh-08/rowproof-demo.git
   cd rowproof-demo
   ```

2. Install dependencies (installs official `rowproof` from npm):
   ```bash
   npm install
   ```

3. Run the demonstration:
   ```bash
   npm start
   ```

---

## Live Sample Output

When running `npm start`, RowProof scans the datasets and produces:

```text
==================================================
 RowProof Demonstration - CSV Data Quality Validator
 Tagline: Validate your rows. Trust your data.
==================================================

--- Scenario 1: Validating Clean Student CSV ---
Status: PASSED (Valid CSV)
Total Rows Processed: 3
Total Errors Detected: 0

--- Scenario 2: Validating Dirty Student CSV ---
Status: FAILED (Quality Issues Found)
Total Rows Processed: 6
Total Issues Found: 6

┌─────────┬─────┬─────────┬────────────────────┬──────────────────────────────────────────────────────────────────────────────────────┐
│ (index) │ Row │ Column  │ Rule               │ Message                                                                              │
├─────────┼─────┼─────────┼────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
│ 0       │ 3   │ 'name'  │ 'missing_value'    │ "Missing required value in column 'name'."                                           │
│ 1       │ 3   │ 'age'   │ 'invalid_type'     │ "Invalid number value 'not_a_number' in column 'age'."                               │
│ 2       │ 4   │ 'email' │ 'unique_violation' │ "Duplicate value 'aarav@university.edu' in column 'email'. Already exists in row 2." │
│ 3       │ 6   │ 'N/A'   │ 'duplicate_record' │ 'Duplicate record found. Row 6 is identical to row 2.'                               │
│ 4       │ 6   │ 'email' │ 'unique_violation' │ "Duplicate value 'aarav@university.edu' in column 'email'. Already exists in row 2." │
│ 5       │ 7   │ 'N/A'   │ 'empty_row'        │ 'Row 7 is empty.'                                                                    │
└─────────┴─────┴─────────┴────────────────────┴──────────────────────────────────────────────────────────────────────────────────────┘

--- Scenario 3: Missing Required Column in Headers ---
Status: FAILED
Error Message: Required column 'email' is missing in CSV headers.

Saved detailed audit report to: ./validation-report.json
```
