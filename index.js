require("dotenv").config(".env");

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env if available

// Serve static files from the frontend
app.use(express.static("../weather-frontend")); // replace with actual path

const cors = require("cors");
app.use(cors());

// Endpoint to get weather data
app.get("/api/weather", async (req, res) => {
  const { location } = req.query;
  const apiKey = process.env.API_KEY; // Use API key from .env
  const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
