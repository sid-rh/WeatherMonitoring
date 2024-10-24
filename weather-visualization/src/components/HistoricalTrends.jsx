import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useCity } from '../context/CityContext';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.REACT_APP_BASE_URL;


const HistoricalTrends = () => {
    const [trendData, setTrendData] = useState([]);
    const { selectedCity } = useCity();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await axios.get(`${API_URL}/api/historical/${selectedCity}`);
          setTrendData(formatHistoricalData(result.data));
          setError(null);
        } catch (err) {
          setError('Failed to fetch historical data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [selectedCity]);
  
    const formatHistoricalData = (data) => {
      return data.map(entry => ({
        timestamp: new Date(entry.dt * 1000).toLocaleDateString(),
        temperature: entry.temp.toFixed(1),
        condition: entry.main
      }));
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Historical Weather Trends - {selectedCity}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={trendData}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="temperature" 
              stroke="#8884d8" 
              fill="#8884d8" 
              name="Temperature" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}

export default HistoricalTrends