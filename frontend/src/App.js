import React, { useState, useEffect } from 'react';

// Backend URL from env
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [items, setItems]     = useState([]);
  const [status, setStatus]   = useState('Checking...');
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    // Health check
    fetch(`${BACKEND_URL}/health`)
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('offline - cannot reach backend'));

    // Fetch items
    fetch(`${BACKEND_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load items from backend.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <h1>My App on KinD + ArgoCD</h1>

      <p><strong>Backend status:</strong> {status}</p>
      <p><strong>Backend URL:</strong> {BACKEND_URL}</p>

      <h2>Items from .NET API</h2>

      {loading && <p>Loading items...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <footer style={{ marginTop: "20px" }}>
        <small>Deployed with KinD + ArgoCD GitOps</small>
      </footer>

    </div>
  );
}

export default App;