const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
city: {
    type: String,
    required: true
},
type: {
    type: String,
    required: true,
    enum: ['HIGH_TEMPERATURE', 'WEATHER_CONDITION']
},
message: {
    type: String,
    required: true
},
value: {
    type: Number,
    required: true
},
timestamp: {
    type: Date,
    default: Date.now
},
acknowledged: {
    type: Boolean,
    default: false
}
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
