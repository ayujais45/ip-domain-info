import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const entries = input
      .split(/[\n,]+/)
      .map(entry => entry.trim())
      .filter(Boolean);

    if (entries.length === 0) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/enrich', {
        inputList: entries
      });

      setResults(res.data.results || []);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🔍 IP / Domain Info Lookup</h1>
      <textarea
        rows={6}
        placeholder="Enter IPs or Domains (comma or line separated)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Get Info'}
      </button>

      {results.map((item, idx) => (
        <div key={idx} className="result-card">
          <h3>{item.input}</h3>
          {item.error ? (
            <p style={{ color: 'red' }}>Error: {item.error}</p>
          ) : (
            <>
              <p><strong>Resolved IP:</strong> {item.ip}</p>

              <details>
                <summary>🌍 Geolocation</summary>
                <pre>{JSON.stringify(item.geolocation, null, 2)}</pre>
              </details>

              <details>
                <summary>📄 WHOIS</summary>
                <pre>{JSON.stringify(item.whois, null, 2)}</pre>
              </details>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
