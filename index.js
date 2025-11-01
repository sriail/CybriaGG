const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

const app = express();

const nggUrl = 'https://mathsspot.com';

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Landing page route - check for specific query parameter
app.get('/', (req, res, next) => {
  // If user hasn't started yet, show landing page
  if (!req.query.start && !req.query.proxy) {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      // Fallback if file doesn't exist
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CybriaGG - Roblox Proxy</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .container {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                }
                .logo {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    color: white;
                }
                h1 { color: #333; margin-bottom: 10px; font-size: 32px; }
                p { color: #666; margin-bottom: 30px; line-height: 1.6; }
                .btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 50px;
                    font-size: 18px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                    margin: 10px;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn:hover { transform: translateY(-2px); }
                .info-box {
                    background: #f0f4ff;
                    border-left: 4px solid #667eea;
                    padding: 15px;
                    margin-top: 20px;
                    border-radius: 8px;
                    text-align: left;
                }
                .info-box h3 { color: #667eea; margin-bottom: 8px; font-size: 16px; }
                .info-box ul { color: #555; font-size: 14px; margin-left: 20px; }
                .info-box li { margin: 5px 0; }
                .alert {
                    background: #fff3cd;
                    border: 1px solid #ffc107;
                    padding: 12px;
                    border-radius: 8px;
                    margin-top: 15px;
                    color: #856404;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">🎮</div>
                <h1>CybriaGG</h1>
                <p>Access Roblox freely through Now.GG proxy. Choose your preferred mode below.</p>
                
                <a href="/?start=direct" class="btn">Open Direct</a>
                <button class="btn" onclick="openCloaked()">Open Cloaked</button>

                <div class="info-box">
                    <h3>🔒 Cloak Mode Features:</h3>
                    <ul>
                        <li>Opens in about:blank window</li>
                        <li>Hides from browser history</li>
                        <li>Toggle visibility button</li>
                        <li>Discreet access</li>
                    </ul>
                </div>
                
                <div class="alert" id="alert" style="display:none;">
                    ⚠️ Please allow popups for this site to use Cloak Mode!
                </div>
            </div>

            <script>
                function openCloaked() {
                    // Try to open the window
                    const win = window.open('about:blank', '_blank');
                    
                    if (!win || win.closed || typeof win.closed == 'undefined') {
                        // Popup was blocked
                        document.getElementById('alert').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('alert').style.display = 'none';
                        }, 5000);
                        return;
                    }

                    const currentOrigin = window.location.origin;

                    win.document.open();
                    win.document.write(\`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Google</title>
                            <link rel="icon" href="https://www.google.com/favicon.ico">
                            <style>
                                * { margin: 0; padding: 0; box-sizing: border-box; }
                                body { overflow: hidden; }
                                #content-frame {
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    border: none;
                                    z-index: 1;
                                }
                                .cloak-toggle {
                                    position: fixed;
                                    bottom: 20px;
                                    left: 20px;
                                    width: 50px;
                                    height: 50px;
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                    border: none;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                                    transition: all 0.3s;
                                    z-index: 10000;
                                }
                                .cloak-toggle:hover {
                                    transform: scale(1.1);
                                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
                                }
                                .cloak-toggle svg {
                                    width: 28px;
                                    height: 28px;
                                    stroke: white;
                                    stroke-width: 2;
                                    fill: none;
                                }
                                .hidden { display: none !important; }
                                #cover {
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: white;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    flex-direction: column;
                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                    z-index: 9998;
                                }
                                #cover img { width: 272px; margin-bottom: 20px; }
                                #cover h1 { color: #333; font-size: 24px; margin-bottom: 10px; }
                                #cover p { color: #666; }
                            </style>
                        </head>
                        <body>
                            <iframe id="content-frame" src="\${currentOrigin}/?proxy=1"></iframe>
                            
                            <div id="cover" class="hidden">
                                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google">
                                <h1>Google Search</h1>
                                <p>Click the eye button to return</p>
                            </div>

                            <button class="cloak-toggle" onclick="toggleCloak()" title="Toggle Cloak Mode">
                                <svg viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            </button>

                            <script>
                                let isCloaked = false;
                                const frame = document.getElementById('content-frame');
                                const cover = document.getElementById('cover');

                                function toggleCloak() {
                                    isCloaked = !isCloaked;
                                    if (isCloaked) {
                                        frame.classList.add('hidden');
                                        cover.classList.remove('hidden');
                                    } else {
                                        frame.classList.remove('hidden');
                                        cover.classList.add('hidden');
                                    }
                                }

                                document.addEventListener('keydown', function(e) {
                                    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
                                        e.preventDefault();
                                        toggleCloak();
                                    }
                                });
                            <\/script>
                        </body>
                        </html>
                    \`);
                    win.document.close();
                    
                    // Try to close opener window
                    try {
                        window.close();
                    } catch(e) {
                        // If we can't close, at least navigate away
                        window.location.href = 'https://www.google.com';
                    }
                }
            </script>
        </body>
        </html>
      `);
    }
  } else {
    // User clicked "Open Direct" or is in proxy mode
    next();
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
