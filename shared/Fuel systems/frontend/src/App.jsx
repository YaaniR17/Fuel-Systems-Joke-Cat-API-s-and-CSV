import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [fuelData, setFuelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your Express middleman
    axios.get('http://localhost:8080/api/fuel')
      .then(response => {
        setFuelData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Could not load fuel data. Is Express running?");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem', fontSize: '1.5rem' }}>Loading live prices...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '3rem 2rem', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '3rem', fontSize: '2.5rem' }}>
        UK Fuel Price Averages
      </h1>
      
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
        {fuelData.map((fuel) => (
          <div key={fuel.id} style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            textAlign: 'center',
            minWidth: '220px',
            borderTop: '6px solid #3498db'
          }}>
            <h2 style={{ margin: '0 0 10px 0', color: '#7f8c8d', fontSize: '1.4rem' }}>
              {fuel.fuel_type}
            </h2>
            <p style={{ fontSize: '3rem', fontWeight: '800', margin: '0', color: '#2c3e50' }}>
              {fuel.average_price.toFixed(2)}
            </p>
            <p style={{ margin: '5px 0 15px 0', color: '#95a5a6', fontWeight: 'bold' }}>
              Pence / Litre
            </p>
            <small style={{ color: '#bdc3c7', display: 'block', borderTop: '1px solid #eee', paddingTop: '10px' }}>
              Updated: {new Date(fuel.calculated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;