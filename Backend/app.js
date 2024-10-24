const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mongoose=require('mongoose');
const app = express();

const cors=require('cors');
app.use(cors());

const dotenv=require('dotenv');
dotenv.config();
const sendAlertEmail=require('./Utils/AlertEmail');
const {saveWeatherData,getAlerts,createAlert,getDailySummaries,saveDailySummary,getWeatherData,checkTemperatureAlert}=require("./Services/WeatherService");

const {fetchWeatherData,calculateDailySummary}=require('./Utils/ProcessWeather');
const WeatherRoutes=require('./Routes/WeatherRoutes');

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
.then(
    ()=>{
        console.log("Connected to db");
    }
);

app.use(express.json());


const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// In-memory storage for weather data
let weatherData = {};
let dailySummaries = {};

// User-configurable thresholds
// let TEMPERATURE_THRESHOLD = 35;
let {TEMPERATURE_THRESHOLD}=require('./Controllers/WeatherController');
const CONSECUTIVE_ALERTS = 2;

// Initialize weather data structure
CITIES.forEach(city => {
  weatherData[city] = [];
  dailySummaries[city] = {};
});


// Cron job to fetch weather data every 5 minutes
cron.schedule('*/60 * * * *', async () => {
  for (const city of CITIES) {
    try {
      const data = await fetchWeatherData(city);
      if (data) {
        await saveWeatherData(data);
        
        const alertCheck = await checkTemperatureAlert(
          city,
          TEMPERATURE_THRESHOLD,
          CONSECUTIVE_ALERTS
        );
        if (alertCheck) {
          const alertData = {
            city,
            type: 'HIGH_TEMPERATURE',
            message: `High temperature alert for ${city}`,
            value: data.temp
          };
          console.log(alertData);
          await createAlert(alertData);
          await sendAlertEmail(city, data.temp);
        }
        
        // Calculate daily summary at the end of the day
        const currentDate = new Date().toISOString().split('T')[0];
        const dailyData = await getWeatherData(
          city,
          new Date(currentDate),
          new Date(new Date(currentDate).setHours(23, 59, 59))
        );
  
        if (dailyData.length > 0) {
          const summary = calculateDailySummary(dailyData);
          await saveDailySummary({
            city,
            date: new Date(currentDate),
            ...summary
          });
        }
      }
    } catch (error) {
      console.error(`Error processing data for ${city}:`, error);
    }
  }
});


app.use('/',WeatherRoutes);

app.listen(port, () => {
  console.log(`Weather monitoring app listening at http://localhost:${port}`);
});