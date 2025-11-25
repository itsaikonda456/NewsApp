const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const API_KEY = '225eb7c6cbee4b2f8c47998931cded76';
const BASE_URL = 'https://newsapi.org/v2/everything?q=apple&from=2024-12-05&to=2024-12-05&sortBy=popularity&apiKey=225eb7c6cbee4b2f8c47998931cded76';

app.get('/api/news', async (req, res) => {
  try {
    const { country, category, page, pageSize, q } = req.query;
    let url = `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;

    if (q) {
      url += `&q=${q}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
