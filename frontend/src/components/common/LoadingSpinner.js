import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { fetchEnvironmentalData } from '../../services/api';
import { getToken } from '../../utils/auth';

function EnvironmentalDataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchEnvironmentalData(token)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    } else {
      setError('Authentication required');
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <h2>Environmental Data</h2>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Air Quality</th>
              <th>Recorded At</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.data_id}>
                <td>{item.location_id}</td>
                <td>{item.temperature && item.temperature.toFixed(2)}</td>
                <td>{item.humidity && item.humidity.toFixed(2)}</td>
                <td>{item.air_quality}</td>
                <td>{new Date(item.recorded_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No environmental data available.</p>
      )}
    </div>
  );
}

export default EnvironmentalDataList;
