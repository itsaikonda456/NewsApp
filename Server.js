const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// ⬅️ Load API key from .env or fallback
const API_KEY = process.env.NEWS_API_KEY || "225eb7c6cbee4b2f8c47998931cded76";

// 🟢 Main API Endpoint
app.get("/api/news", async (req, res) => {
  try {
    const {
      country = "in",
      category = "general",
      page = 1,
      pageSize = 8,
      q = "",
    } = req.query;

    // 🟢 Build final NewsAPI URL
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;

    // Optional search parameter
    if (q) {
      url += `&q=${q}`;
    }

    // Fetch data from NewsAPI
    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
