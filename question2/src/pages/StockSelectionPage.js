import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, Typography, TextField, Button } from "@mui/material";

const StockSelectionPage = () => {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) {
      navigate(`/stock/${ticker.trim().toUpperCase()}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stock Analysis
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter a stock ticker symbol to view analysis
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Stock Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="e.g. AAPL, MSFT"
          sx={{ mr: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!ticker.trim()}
        >
          Analyze
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Popular Stocks:
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {["AAPL", "MSFT", "GOOG", "AMZN", "TSLA"].map((popularTicker) => (
            <Button
              key={popularTicker}
              variant="outlined"
              onClick={() => navigate(`/stock/${popularTicker}`)}
            >
              {popularTicker}
            </Button>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default StockSelectionPage;
