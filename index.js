const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

const nggUrl = 'https://mathsspot.com';

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve the landing page at root
app.get('/', (req, res) => {
  // Check if this is the initial landing page request
  if (!req.headers.referer || !req.headers.referer.includes(req.headers.host)) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    // If coming from our site, proxy to mathsspot
    proxy(req, res);
  }
});

const proxy = createProxyMiddleware({
  target: nggUrl,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  router: function(req) {
    if (req.headers.host === 'mathsspot.com') {
      req.headers['X-Forwarded-For'] = ''; 
      req.headers['X-Real-IP'] = '';
      req.headers['Via'] = '';
    }
    return nggUrl;
  }
});

// Proxy all other requests
app.use('/', proxy);

const port = process.env.PORT || 443;
app.listen(port, () => {
  console.log(`CybriaGG is running on port ${port}`);
});
