import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const StockChart = ({ data }) => {
  const chartData = data.priceHistory.map((item) => ({
    ...item,
    timestamp: new Date(item.lastUpdatedAt).toLocaleTimeString(),
  }));

  return (
    <Box sx={{ height: 500 }}>
      <Typography variant="h6" gutterBottom>
        Price History (Last {data.priceHistory.length * 5} minutes)
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#1976d2"
            activeDot={{ r: 8 }}
            name="Stock Price"
          />
          <ReferenceLine
            y={data.averageStockPrice}
            label={`Avg $${data.averageStockPrice.toFixed(2)}`}
            stroke="#dc004e"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StockChart;
