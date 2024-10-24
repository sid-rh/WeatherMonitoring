import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCity } from '../context/CityContext';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.REACT_APP_BASE_URL;

const AlertLog = () => {
    const [alerts, setAlerts] = useState([]);
    const { selectedCity } = useCity();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await axios.get(`${API_URL}/api/alerts/${selectedCity}`);
          setAlerts(formatAlertData(result.data));
          setError(null);
        } catch (err) {
          setError('Failed to fetch alert data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [selectedCity]);
  
    const formatAlertData = (data) => {
      return data.map(alert => ({
        id: alert.id,
        timestamp: new Date(alert.timestamp).toLocaleString(),
        message: alert.message,
        type: alert.type
      }));
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Temperature Alerts - {selectedCity}</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="border-l-4 border-yellow-500 bg-yellow-50 p-4"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{alert.timestamp}</span>
                <span className="text-red-600">{alert.temperature}°C</span>
              </div>
              <p className="mt-1">{alert.message}</p>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-gray-500">No alerts recorded</p>
          )}
        </div>
      </div>
    );
}

export default AlertLog