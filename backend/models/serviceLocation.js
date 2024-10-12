const mongoose = require('mongoose');

const serviceLocationSchema = new mongoose.Schema({
  locname: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: [Number], // Array of numbers for [latitude, longitude]
    required: true,
    validate: {
      validator: function(value) {
        return value.length === 2; // Ensures it's an array with 2 elements (lat, lng)
      },
      message: 'Location must have exactly two elements: latitude and longitude'
    }
  },
  address: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('ServiceLocation', serviceLocationSchema);
