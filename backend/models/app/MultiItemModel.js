const mongoose = require('mongoose');

const multiItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },  // Store the image file path
    price: { type: Number, required: true },
    discount: { type: Number },
    discount_type: { type: String, enum: ['flat', 'percent'], required: true },
    discount_validity: { type: Date }  // Use Date to validate and calculate discount expiry
}, {
    timestamps: true
});

module.exports = mongoose.model('MultiItem', multiItemSchema);
