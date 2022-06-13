const express = require("express");

const router = express.Router();

/**
 * Returns API status
 *
 * @route GET /
 * @group index - Validate and gives you back API service status
 * @returns {object} 200  - {
 *     title: "Blockchain Based Patient History Management API",
 *     version: "1.0.0",
 *     description: "It is a blockchain technology-based API to prevent patient history from modification.",
 * }
 * @returns {Error} default - Unexpected error
 */

router.get("/", (req, res) => {
  res.json({
    title: "Blockchain Based Patient History Management API",
    version: "1.0.0",
    description:
      "It is a blockchain technology-based API to prevent patient history from modification.",
  });
});

module.exports = router;
