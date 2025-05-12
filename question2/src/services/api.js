const API_URL = "http://localhost:6969"; // Replace with deployed URL if needed

// Fetch average price data for a stock
export const fetchStockData = async (ticker, interval = 30) => {
  try {
    const res = await fetch(`${API_URL}/stocks/${ticker}?interval=${interval}`);
    if (!res.ok) throw new Error("Failed to fetch stock data");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// Fetch correlation for exactly 2 tickers
export const fetchCorrelationData = async (tickers, interval = 30) => {
  if (tickers.length !== 2) throw new Error("Exactly 2 tickers are required");

  const url = new URL(`${API_URL}/stockcorrelation`);
  url.searchParams.append("ticker", tickers[0]);
  url.searchParams.append("ticker", tickers[1]);
  url.searchParams.append("interval", interval);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to fetch correlation data");
    return await res.json();
  } catch (err) {
    throw err;
  }
};
