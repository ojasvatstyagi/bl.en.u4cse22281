import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, Typography, Paper, Button } from "@mui/material"; // Import Button
import StockChart from "../components/StockChart";
import TimeIntervalSelector from "../components/TimeIntervalSelector";
import { fetchStockData } from "../services/api"; // Import the fetch function

const StockAnalysisPage = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeInterval, setTimeInterval] = useState(30);
  const { ticker } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const loadData = async () => {
      if (!ticker) {
        setError("No stock ticker specified");
        return;
      }

      setLoading(true);
      try {
        const data = await fetchStockData(ticker, timeInterval);
        setStockData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ticker, timeInterval]);

  if (!ticker) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography color="error">Please select a stock</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {ticker} Stock Analysis
        </Typography>
        <TimeIntervalSelector value={timeInterval} onChange={setTimeInterval} />
      </Box>

      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)} // Navigate to the previous page
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {stockData && <StockChart data={stockData} />}
    </Paper>
  );
};

export default StockAnalysisPage;
