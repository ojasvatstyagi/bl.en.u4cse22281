const axios = require("axios");
require("dotenv").config();

const accessToken = process.env.ACCESS_TOKEN;

const fetchStockData = async (ticker, minutes) => {
  // fetch stock data from the API
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${accessToken}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = res.data["Time Series (5min)"];
  return Object.entries(data).map(([timestamp, values]) => ({
    timestamp,
    price: parseFloat(values["1. open"]),
  }));
};

const calculateAverage = (data) => {
  if (!data.length) return 0;
  const sum = data.reduce((acc, item) => acc + item.price, 0);
  return sum / data.length;
};

const calculateCorrelation = (data1, data2) => {
  if (data1.length !== data2.length || !data1.length) return 0;

  const n = data1.length;
  let sum1 = 0,
    sum2 = 0,
    sum1Sq = 0,
    sum2Sq = 0,
    pSum = 0;

  for (let i = 0; i < n; i++) {
    const price1 = data1[i].price;
    const price2 = data2[i].price;
    sum1 += price1;
    sum2 += price2;
    sum1Sq += price1 * price1;
    sum2Sq += price2 * price2;
    pSum += price1 * price2;
  }

  const num = pSum - (sum1 * sum2) / n;
  const den = Math.sqrt(
    (sum1Sq - (sum1 * sum1) / n) * (sum2Sq - (sum2 * sum2) / n)
  );

  return den === 0 ? 0 : num / den;
};

module.exports = {
  fetchStockData,
  calculateAverage,
  calculateCorrelation,
};
