const rowproof = require("rowproof");

/**
 * Serverless API handler for Vercel.
 * Accepts: { csvText: string, options: Object }
 * Returns: rowproof validation report JSON
 */
module.exports = async (req, res) => {
  // Set CORS headers for interoperability
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  try {
    const { csvText, options = {} } = req.body || {};

    if (typeof csvText !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'csvText' string in request body." });
    }

    const report = rowproof.validateString(csvText, options);
    return res.status(200).json(report);
  } catch (err) {
    return res.status(500).json({
      isValid: false,
      totalRows: 0,
      totalErrors: 1,
      errors: [
        {
          row: null,
          column: null,
          rule: "server_error",
          message: err.message || "Internal server error",
        },
      ],
    });
  }
};
