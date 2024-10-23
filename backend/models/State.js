const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
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

module.exports = mongoose.model('State', stateSchema);
