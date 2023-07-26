const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const apiKey = process.env.API_KEY;

// Endpoint to fetch exchange rates using v6.exchangerate-api.com
app.get('/api/exchange-rates', async (req, res) => {
  const { baseCurrency } = req.query;
  try {
    const response = await fetchExchangeRates(baseCurrency);
    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});

// Endpoint to fetch data from an external API using a URL query parameter
app.get('/api/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Please provide a url query parameter');
  }

  try {
    const proxyRes = await axios.get(`${url}&apiKey=${apiKey}`);
    res.send(proxyRes.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Failed to fetch data from the provided URL.' });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});