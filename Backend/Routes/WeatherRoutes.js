const express=require('express');
const router=express.Router();
const {getCurrentWeather,getSummary,dailySummaries,getHistoricalData,getAlertData}=require("../Controllers/WeatherController");

router.get('/current',getCurrentWeather);
router.get('/summary',getSummary);
router.get('/api/summary/:city',dailySummaries);
router.get('/api/historical/:city',getHistoricalData);
router.get('/api/alerts/:city',getAlertData);

module.exports=router;