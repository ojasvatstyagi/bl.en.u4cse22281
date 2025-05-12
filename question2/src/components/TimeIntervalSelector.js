import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";

const TimeIntervalSelector = ({ value, onChange }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography>Time Interval:</Typography>
      <TextField
        select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        size="small"
        sx={{ minWidth: 120 }}
      >
        {[15, 30, 60, 120, 240].map((minutes) => (
          <MenuItem key={minutes} value={minutes}>
            {minutes} minutes
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default TimeIntervalSelector;
