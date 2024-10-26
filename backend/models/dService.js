// models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String, // Store the path to the uploaded image
        required: false,
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
