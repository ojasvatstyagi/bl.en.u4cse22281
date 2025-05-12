const express = require("express");
const router = express.Router();
const {
  getAverageOfStock,
  getCorrelationOfStocks,
} = require("../controllers/stockController"); // Importing the functions from the controllers

// Add this to validate tickers for correlation
const validateTickers = (req, res, next) => {
  if (!req.query.ticker || !Array.isArray(req.query.ticker)) {
    return res.status(400).json({ error: "Tickers must be provided as array" });
  }
  if (req.query.ticker.length !== 2) {
    return res.status(400).json({ error: "Exactly 2 tickers required" });
  }
  next();
};

// Defining the routes for the API
router.get("/stocks/:ticker", getAverageOfStock);
router.get("/stockcorrelation", validateTickers, getCorrelationOfStocks);

module.exports = router;
