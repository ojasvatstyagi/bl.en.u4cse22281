const express = require("express");
const axios = require("axios");

const app = express(); // creating an instance of express to use it's features

const stockRoutes = require("./routes/stockRoutes");
app.use(express.json()); // to parse incoming json req

const PORT = 6969;

app.use("/", stockRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
