import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Your backend URL

export const fetchStockData = async (ticker, minutes) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/stock/${ticker}/average`,
      {
        params: { minutes },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const fetchCorrelationData = async (tickers, minutes) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stock/correlation`, {
      params: { ticker: tickers, minutes },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching correlation data:", error);
    throw error;
  }
};
