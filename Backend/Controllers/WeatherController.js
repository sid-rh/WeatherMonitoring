const {saveWeatherData,getAlerts,createAlert,getDailySummaries,saveDailySummary,getWeatherData,checkTemperatureAlert}=require("../Services/WeatherService");

const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];


let TEMPERATURE_THRESHOLD=35;

const getCurrentWeather=async(req, res) => {
    let currentData = {};
    for(let city of CITIES) {
      currentData[city] = await getWeatherData(city,1,1);
    }
    console.log(currentData);
    
    res.json(currentData);
  }

const getSummary=async(req, res) => {
    const dailySummaries=await getDailySummaries(0);
    res.json(dailySummaries);
  }

const dailySummaries=async(req,res)=>{
    try {
        const { city } = req.params;
        const data = await getDailySummaries(
          city
          // new Date(startDate),
          // new Date(endDate)
        );
        res.json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch daily summaries' });
      }
}

const getHistoricalData=async(req,res)=>{
    try {
        const { city } = req.params;
        const data =await getWeatherData(city,0,0);
        res.json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch historical data' });
      }
}

const getAlertData=async(req,res)=>
{
    try {
        const { city } = req.params;
        const alerts = await getAlerts(city);
        res.json(alerts);
      } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
      }
}


module.exports={getCurrentWeather,getSummary,dailySummaries,getHistoricalData,getAlertData}