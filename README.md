<h1>🌐 IP & Domain Info Lookup Tool</h1>

<p>A full-stack web app to enrich IP addresses and domain names with <strong>WHOIS</strong> and <strong>geolocation</strong> data. Perfect for <em>cybersecurity, incident response</em>, or <em>forensic analysis</em>. Supports <strong>bulk lookup</strong> of multiple IPs/domains at once!</p>

<div class="section">
  <h2>✅ Features</h2>
  <ul>
    <li>🔍 WHOIS lookup using Woxy API (for <code>.com</code> domains)</li>
    <li>🌍 IP/Domain geolocation via IPGeolocation API</li>
    <li>📋 Bulk search support for multiple IPs/domains</li>
    <li>⚡ React frontend + Node.js Express backend</li>
    <li>🔐 Secure handling of API keys using environment variables</li>
  </ul>
</div>

<div class="section">
  <h2>🧰 Tech Stack</h2>
  <ul>
    <li><strong>Frontend</strong>: React, Axios, Tailwind CSS</li>
    <li><strong>Backend</strong>: Node.js, Express</li>
    <li><strong>APIs</strong>:
      <ul>
        <li><a href="https://woxy.dev" target="_blank">Woxy WHOIS API</a></li>
        <li><a href="https://ipgeolocation.io" target="_blank">IPGeolocation.io</a></li>
      </ul>
    </li>
    <li><strong>Others</strong>: dotenv for environment variable management</li>
  </ul>
</div>

<div class="section">
  <h2>🏁 Getting Started (Local Setup)</h2>
  <h3>🖥️ 1. Backend Setup</h3>
  <pre><code>mkdir backend
cd backend
npm init -y
npm install express axios cors dotenv</code></pre>

  <p>Create a file named <code>server.js</code> in the <code>backend/</code> folder and add your backend code.</p>

  <p>Create a <code>.env</code> file in the <code>backend/</code> folder:</p>
  <pre><code>WHOIS_API_KEY=your_woxy_api_key
GEO_API_KEY=your_ipgeolocation_api_key</code></pre>

  <p>Start the backend:</p>
  <pre><code>node server.js</code></pre>

  <p>Backend runs at: <code>http://localhost:5000</code></p>

  <h3>🌐 2. Frontend Setup</h3>
  <pre><code>npx create-react-app frontend
cd frontend
npm install axios</code></pre>

  <p>Replace <code>App.js</code> inside <code>frontend/src/</code> with your provided frontend code.</p>

  <p>Start the frontend:</p>
  <pre><code>npm start</code></pre>

  <p>Frontend runs at: <code>http://localhost:3000</code></p>
</div>

<div class="section">
  <h2>📖 Usage</h2>
  <ol>
    <li>Run both frontend and backend.</li>
    <li>Open <code>http://localhost:3000</code> in your browser.</li>
    <li>Enter one or more IPs/domains separated by commas or new lines.</li>
    <li>Click <strong>"Get Info"</strong>.</li>
    <li>View WHOIS and Geo info for each input.</li>
  </ol>
</div>

<div class="section">
  <h2>📁 Project Structure</h2>
  <pre><code>ip-domain-info/
├── backend/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
└── README.md</code></pre>
</div>

<div class="section">
  <h2>🔐 Security Notes</h2>
  <ul>
    <li>Do not upload <code>.env</code> to GitHub — always add it to <code>.gitignore</code></li>
    <li>Monitor API usage and regenerate keys periodically</li>
  </ul>
</div>

<div class="section">
  <h2>🎯 Future Enhancements</h2>
  <ul>
    <li>Export results to CSV</li>
    <li>Support more WHOIS TLDs</li>
    <li>Add dark mode UI toggle</li>
    <li>Store search history</li>
  </ul>
</div>

<div class="section">
  <h2>🙋‍♂️ Author</h2>
  <p>Developed by <a href="https://github.com/ayujais45" target="_blank">Ayushi Jaiswal</a></p>
</div>

</body>
</html>
