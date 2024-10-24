const Weather=require("../Models/Weather");
const DailySummary=require("../Models/DailySummary");
const Alert=require("../Models/Alert");


  // Save weather data
const saveWeatherData=async(data)=> {
try {
    const weather = new Weather(data);
    await weather.save();
    return weather;
} catch (error) {
    console.error('Error saving weather data:', error);
    throw error;
}
}

// Get weather data for a city within a date range
const getWeatherData=async(city, startDate, endDate)=> {
try {
    if(!startDate)
    {
        const data=await Weather.find({city:city});
        return data;
    }
    else if(startDate==1)
    {
        const data=await Weather.findOne({city}).sort({timestamp:-1});
        return{
            city:data.city,
            main:data.main,
            temp:data.temp,
            feels_like:data.feels_like,
        }
    }
    return await Weather.find({
    city,
    timestamp: {
        $gte: startDate,
        $lte: endDate
    }
    }).sort({ timestamp: -1 });
} catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
}
}

// Save daily summary
const saveDailySummary=async(summaryData)=> {
try {
    const summary = new DailySummary(summaryData);
    await summary.save();
    return summary;
} catch (error) {
    console.error('Error saving daily summary:', error);
    throw error;
}
}

// Get daily summaries for a city
const getDailySummaries=async(city)=> {
try {
    if(city==0)
    {
        return await DailySummary.find().sort({date:-1});
    }
    return await DailySummary.find({
    city,
    // date: {
    //     $gte: startDate,
    //     $lte: endDate
    // }
    }).sort({ date: -1 });
} catch (error) {
    console.error('Error fetching daily summaries:', error);
    throw error;
}
}

// Create alert
const createAlert=async(alertData)=> {
try {
    const alert = new Alert(alertData);
    await alert.save();

    return alert;
} catch (error) {
    console.error('Error creating alert:', error);
    throw error;
}
}

// Get alerts
const getAlerts=async(city)=> {
try {
    return await Alert.find({
    city,
    // timestamp: {
    //     $gte: startDate,
    //     $lte: endDate
    // }
    }).sort({ timestamp: -1 });
} catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
}
}

const checkTemperatureAlert=async(city, threshold, consecutiveReadings = 2)=> {
    try {
      // Get the most recent readings for the city
      const recentReadings = await Weather.find({ city })
        .sort({ timestamp: -1 })
        .limit(consecutiveReadings);

      // If we don't have enough readings, return false
      if (recentReadings.length < consecutiveReadings) {
        return {
          isAlert: false,
          readings: recentReadings
        };
      }

      // Check if all recent readings exceed the threshold
      const isAlert = recentReadings.every(reading => reading.temp > threshold);

      return isAlert;

      // If this is a new alert, check if we already have a recent unacknowledged alert
    //   if (isAlert) {
    //     const existingAlert = await Alert.findOne({
    //       city,
    //       type: 'HIGH_TEMPERATURE',
    //       acknowledged: false,
    //       timestamp: {
    //         $gte: new Date(Date.now() - 1000 * 60 * 60) // Last hour
    //       }
    //     });

    //     // If we already have a recent alert, don't create a new one
    //     if (existingAlert) {
    //       return {
    //         isAlert: false,
    //         alreadyAlerted: true,
    //         existingAlert
    //       };
    //     }
    //   }

    //   return {
    //     isAlert,
    //     readings: recentReadings,
    //     maxTemp: Math.max(...recentReadings.map(r => r.temp)),
    //     duration: consecutiveReadings * 5, // Assuming 5-minute intervals
    //     threshold
    //   };
    } catch (error) {
      console.error('Error checking temperature alert:', error);
      throw error;
    }
  }


module.exports = {saveWeatherData,getAlerts,createAlert,getDailySummaries,saveDailySummary,getWeatherData,checkTemperatureAlert};