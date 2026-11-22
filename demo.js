const path = require("path");
const rowproof = require("rowproof");

async function runDemo() {
  console.log("==================================================");
  console.log(" RowProof Demonstration - CSV Data Quality Validator");
  console.log(" Tagline: Validate your rows. Trust your data.");
  console.log("==================================================\n");

  // Scenario 1: Valid CSV
  console.log("--- Scenario 1: Validating Clean Student CSV ---");
  const cleanPath = path.join(__dirname, "data", "students_clean.csv");
  const cleanResult = await rowproof.validate(cleanPath, {
    required: ["id", "name", "email", "age"],
    unique: ["id", "email"],
    types: {
      id: "integer",
      age: "number",
      email: "email",
      enrolled: "boolean",
    },
  });

  console.log(`Status: ${cleanResult.isValid ? "PASSED (Valid CSV)" : "FAILED"}`);
  console.log(`Total Rows Processed: ${cleanResult.totalRows}`);
  console.log(`Total Errors Detected: ${cleanResult.totalErrors}\n`);

  // Scenario 2: Dirty CSV with multiple data quality defects
  console.log("--- Scenario 2: Validating Dirty Student CSV ---");
  const dirtyPath = path.join(__dirname, "data", "students_dirty.csv");
  const dirtyResult = await rowproof.validate(dirtyPath, {
    required: ["id", "name", "email", "age"],
    unique: ["email"],
    types: {
      id: "integer",
      age: "number",
      email: "email",
      enrolled: "boolean",
    },
  });

  console.log(`Status: ${dirtyResult.isValid ? "PASSED" : "FAILED (Quality Issues Found)"}`);
  console.log(`Total Rows Processed: ${dirtyResult.totalRows}`);
  console.log(`Total Issues Found: ${dirtyResult.totalErrors}`);
  console.log("\nDetected Issues Table:");
  console.table(
    dirtyResult.errors.map((err) => ({
      Row: err.row ?? "N/A",
      Column: err.column ?? "N/A",
      Rule: err.rule,
      Message: err.message,
    }))
  );

  // Scenario 3: Missing Required Column in Header
  console.log("\n--- Scenario 3: Missing Required Column in Headers ---");
  const customerPath = path.join(__dirname, "data", "customers.csv");
  const customerResult = await rowproof.validate(customerPath, {
    required: ["id", "fullName", "email"], // email does not exist in CSV!
  });

  console.log(`Status: ${customerResult.isValid ? "PASSED" : "FAILED"}`);
  console.log(`Error Message: ${customerResult.errors[0].message}\n`);

  // Export report to JSON file
  const reportPath = path.join(__dirname, "validation-report.json");
  await dirtyResult.saveJSON(reportPath);
  console.log(`Saved detailed audit report to: ${reportPath}`);

  console.log("\nDemo completed successfully!");
}

runDemo().catch((err) => {
  console.error("Demo failed with unexpected error:", err);
});
