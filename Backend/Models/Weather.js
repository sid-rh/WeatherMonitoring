const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad']
  },
  main: {
    type: String,
    required: true
  },
  temp: {
    type: Number,
    required: true
  },
  feels_like: {
    type: Number,
    required: true
  },
  dt: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;