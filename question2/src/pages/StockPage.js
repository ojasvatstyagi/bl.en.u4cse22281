import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, TextField, MenuItem } from "@mui/material";
import StockChart from "../components/StockChart";
import TimeIntervalSelector from "../components/TimeIntervalSelector";
import { fetchStockData } from "../services/api";

const StockPage = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeInterval, setTimeInterval] = useState(30); // Default 30 minutes
  const { ticker } = useParams();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchStockData(ticker || "AAPL", timeInterval);
        setStockData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ticker, timeInterval]);

  const handleTimeIntervalChange = (minutes) => {
    setTimeInterval(minutes);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {ticker || "AAPL"} Stock Analysis
        </Typography>
        <TimeIntervalSelector
          value={timeInterval}
          onChange={handleTimeIntervalChange}
        />
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {stockData && <StockChart data={stockData} />}
    </Paper>
  );
};

export default StockPage;
