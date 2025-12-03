// TestApp.jsx
import React, { useEffect } from 'react';

function TestApp() {
  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(res => res.json())
      .then(data => console.log('Test fetch:', data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return <div>Test App</div>;
}

export default TestApp;
