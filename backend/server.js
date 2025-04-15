const express = require('express');
const axios = require('axios');
const dns = require('dns');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const WHOXY_API_KEY = process.env.WHOXY_API_KEY;
const GEO_API_KEY = process.env.GEO_API_KEY;

// Check if it's a valid IP
function isValidIpAddress(input) {
  const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return ipRegex.test(input);
}

// Resolve IP from domain (returns promise)
function resolveIpFromDomain(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address) => {
      if (err) reject('Unable to resolve domain.');
      else resolve(address);
    });
  });
}

// Main Enrichment Function
async function enrichSingle(input) {
  try {
    let ipAddress = input;

    if (!isValidIpAddress(input)) {
      ipAddress = await resolveIpFromDomain(input);
    }

    // WHOIS only for domains
    let whoisData = {};
    if (!isValidIpAddress(input)) {
      try {
        const whoisRes = await axios.get(`https://api.whoxy.com/?key=${WHOXY_API_KEY}&whois=${input}`);
        whoisData = whoisRes.data;
      } catch (e) {
        whoisData = { error: "WHOIS lookup failed or not supported." };
      }
    } else {
      whoisData = { info: "WHOIS not available for IPs." };
    }

    // Geolocation for any valid IP
    const geoRes = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_API_KEY}&ip=${ipAddress}`);
    const geolocation = geoRes.data;

    return {
      input,
      ip: ipAddress,
      whois: whoisData,
      geolocation,
    };
  } catch (error) {
    return {
      input,
      error: error.message || 'Something went wrong'
    };
  }
}

// POST: Handle single or batch input
app.post('/api/enrich', async (req, res) => {
  let { inputList } = req.body;

  if (!inputList || !Array.isArray(inputList) || inputList.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of domains or IPs.' });
  }

  try {
    const results = await Promise.all(inputList.map(enrichSingle));
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Error processing batch request.', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
