import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useCity } from '../context/CityContext';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.REACT_APP_BASE_URL;


const DailySummary = () => {
    const [summaryData, setSummaryData] = useState([]);
    const { selectedCity } = useCity();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await axios.get(`${API_URL}/api/summary/${selectedCity}`);
          setSummaryData(formatDailySummaryData(result.data));
          setError(null);
        } catch (err) {
          setError('Failed to fetch daily summary data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [selectedCity]);
  
    const formatDailySummaryData = (data) => {
      // Assuming data is an object with dates as keys
      return Object.entries(data).map(([date, values]) => ({
        date,
        avgTemp: values.avgTemp.toFixed(1),
        maxTemp: values.maxTemp.toFixed(1),
        minTemp: values.minTemp.toFixed(1),
        dominantCondition: values.dominantCondition
      }));
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Daily Weather Summary - {selectedCity}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={summaryData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgTemp" 
              stroke="#8884d8" 
              name="Average Temperature" 
            />
            <Line 
              type="monotone" 
              dataKey="maxTemp" 
              stroke="#82ca9d" 
              name="Maximum Temperature" 
            />
            <Line 
              type="monotone" 
              dataKey="minTemp" 
              stroke="#ffc658" 
              name="Minimum Temperature" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export default DailySummary;