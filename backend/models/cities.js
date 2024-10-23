const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true
    },
    StateName: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('City', CitySchema);
