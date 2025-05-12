const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const stockRoutes = require("./routes/stockRoutes");
app.use("/", stockRoutes);

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
