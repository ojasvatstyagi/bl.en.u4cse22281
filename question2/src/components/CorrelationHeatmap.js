import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

const getColor = (value) => {
  if (value >= 0.7) return "#2e7d32"; // Strong positive
  if (value >= 0.3) return "#689f38"; // Positive
  if (value >= -0.3) return "#9e9e9e"; // Neutral
  if (value >= -0.7) return "#ef6c00"; // Negative
  return "#c62828"; // Strong negative
};

const calculateStdDev = (prices) => {
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  const sqDiffs = prices.map((p) => (p - avg) ** 2);
  const variance = sqDiffs.reduce((a, b) => a + b, 0) / sqDiffs.length;
  return Math.sqrt(variance);
};

const CorrelationHeatmap = ({ data }) => {
  const stocks = Object.keys(data.stocks);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Correlation Heatmap (Last {data.timeFrame} minutes)
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={`80px repeat(${stocks.length}, 1fr)`}
        gap={1}
      >
        <Box /> {/* Top-left blank corner */}
        {stocks.map((stock) => (
          <Box key={`col-${stock}`} textAlign="center" fontWeight="bold">
            {stock}
          </Box>
        ))}
        {stocks.map((rowStock) => (
          <React.Fragment key={`row-${rowStock}`}>
            <Box fontWeight="bold">{rowStock}</Box>
            {stocks.map((colStock) => {
              const key1 = `${rowStock}-${colStock}`;
              const key2 = `${colStock}-${rowStock}`;
              const correlation =
                rowStock === colStock
                  ? 1
                  : data.correlation[key1] ?? data.correlation[key2] ?? 0;

              const stockData = data.stocks[rowStock] || {};
              const stdDev = calculateStdDev(
                stockData.priceHistory?.map((p) => p.price || 0) || []
              );

              return (
                <Tooltip
                  key={`${rowStock}-${colStock}`}
                  title={
                    <Box>
                      <Typography variant="subtitle2">
                        {rowStock} vs {colStock}
                      </Typography>
                      <Typography>
                        Correlation: {correlation.toFixed(2)}
                      </Typography>
                      {rowStock === colStock && stockData && (
                        <>
                          <Typography>
                            Avg Price: ${stockData.averagePrice?.toFixed(2)}
                          </Typography>
                          <Typography>Std Dev: ${stdDev.toFixed(2)}</Typography>
                        </>
                      )}
                    </Box>
                  }
                  arrow
                >
                  <Box
                    height={40}
                    sx={{
                      bgcolor: getColor(correlation),
                      border: "1px solid white",
                    }}
                  />
                </Tooltip>
              );
            })}
          </React.Fragment>
        ))}
      </Box>

      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        {[
          { color: "#c62828", label: "Strong Negative" },
          { color: "#ef6c00", label: "Negative" },
          { color: "#9e9e9e", label: "Neutral" },
          { color: "#689f38", label: "Positive" },
          { color: "#2e7d32", label: "Strong Positive" },
        ].map(({ color, label }) => (
          <Box key={label} display="flex" alignItems="center" gap={1}>
            <Box width={20} height={20} bgcolor={color} />
            <Typography>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CorrelationHeatmap;
