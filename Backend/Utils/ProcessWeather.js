const axios = require('axios');
const dotenv=require('dotenv');
dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';



const fetchWeatherData=async(city)=> {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city},IN&appid=${API_KEY}`);
      const data = response.data;
      
      return {
        city: city,
        main: data.weather[0].main,
        temp: kelvinToCelsius(data.main.temp),
        feels_like: kelvinToCelsius(data.main.feels_like),
        dt: data.dt
      };
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error.message);
      return null;
    }
  }
  
  // Function to convert Kelvin to Celsius
const kelvinToCelsius=(kelvin)=> {
    return kelvin - 273.15;
  }

const calculateDailySummary=(cityData)=> {
const temperatures = cityData.map(d => d.temp);
const weatherConditions = cityData.map(d => d.main);

return {
    avgTemp: temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length,
    maxTemp: Math.max(...temperatures),
    minTemp: Math.min(...temperatures),
    dominantCondition: getDominantCondition(weatherConditions)
};
}

const getDominantCondition=(conditions)=> {
    const counts = conditions.reduce((acc, condition) => {
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

module.exports={fetchWeatherData,calculateDailySummary}