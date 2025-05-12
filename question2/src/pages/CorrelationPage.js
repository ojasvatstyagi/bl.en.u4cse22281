import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import CorrelationHeatmap from "../components/CorrelationHeatmap";
import { fetchCorrelationData } from "../services/api";
import MenuItem from "@mui/material/MenuItem";

const CorrelationPage = () => {
  const [correlationData, setCorrelationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeInterval, setTimeInterval] = useState(60);
  const [tickers, setTickers] = useState(["AAPL", "MSFT"]);
  const [newTicker, setNewTicker] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Check if exactly 2 tickers are selected
        if (tickers.length !== 2) {
          setCorrelationData(null);
          setError("Please select exactly 2 tickers for correlation.");
          setLoading(false);
          return;
        }

        // Fetch the correlation data from the backend
        const data = await fetchCorrelationData(tickers, timeInterval);
        setCorrelationData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tickers, timeInterval]);

  const handleAddTicker = () => {
    if (newTicker && !tickers.includes(newTicker.toUpperCase())) {
      if (tickers.length >= 2) {
        setError(
          "Maximum 2 tickers allowed. Remove one before adding another."
        );
        return;
      }
      setTickers([...tickers, newTicker.toUpperCase()]);
      setNewTicker("");
    }
  };

  const handleRemoveTicker = (tickerToRemove) => {
    setTickers(tickers.filter((ticker) => ticker !== tickerToRemove));
    if (error && tickers.length - 1 === 2) {
      setError(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stock Correlation Heatmap
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Selected Stocks</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          (Select exactly 2 stocks for correlation analysis)
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {tickers.map((ticker) => (
            <Paper
              key={ticker}
              elevation={2}
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                backgroundColor: "primary.light",
                color: "white",
              }}
            >
              {ticker}
              <Button
                size="small"
                sx={{ color: "white", ml: 1 }}
                onClick={() => handleRemoveTicker(ticker)}
              >
                ×
              </Button>
            </Paper>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Add Stock Ticker"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            size="small"
            disabled={tickers.length >= 2}
          />
          <Button
            variant="contained"
            onClick={handleAddTicker}
            disabled={!newTicker || tickers.length >= 2}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          select
          label="Time Interval (minutes)"
          value={timeInterval}
          onChange={(e) => setTimeInterval(Number(e.target.value))}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {[15, 30, 60, 120, 240].map((minutes) => (
            <MenuItem key={minutes} value={minutes}>
              {minutes} minutes
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {correlationData && <CorrelationHeatmap data={correlationData} />}
    </Paper>
  );
};

export default CorrelationPage;
