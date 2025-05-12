const {
  fetchStockData,
  calculateAverage,
  calculateCorrelation,
} = require("../services/stockService");

// function for average
const getAverageOfStock = async (req, res) => {
  const { ticker } = req.params;
  const { minutes } = req.query;

  try {
    const data = await fetchStockData(ticker, minutes);
    const avg = calculateAverage(data);
    return res.json({
      averageStockPrice: avg,
      priceHistory: data.map((item) => ({
        price: item.price,
        lastUpdatedAt: item.timestamp,
      })),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// function for the correlation
const getCorrelationOfStocks = async (req, res) => {
  const { minutes } = req.query;
  const { ticker } = req.query;

  if (!Array.isArray(ticker) || ticker.length !== 2) {
    return res.status(400).json({ error: "Exactly 2 tickers required" });
  }

  try {
    const [data1, data2] = await Promise.all([
      fetchStockData(ticker[0], minutes),
      fetchStockData(ticker[1], minutes),
    ]);

    const correlation = calculateCorrelation(data1, data2);

    return res.json({
      correlation,
      stocks: {
        [ticker[0]]: {
          averagePrice: calculateAverage(data1),
          priceHistory: data1.map((item) => ({
            price: item.price,
            lastUpdatedAt: item.timestamp,
          })),
        },
        [ticker[1]]: {
          averagePrice: calculateAverage(data2),
          priceHistory: data2.map((item) => ({
            price: item.price,
            lastUpdatedAt: item.timestamp,
          })),
        },
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAverageOfStock,
  getCorrelationOfStocks,
};
