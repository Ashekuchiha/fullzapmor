const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    service: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: [String], required: true }, // array of multiple values
    phnnumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['good', 'bad'], default: 'good' },
    certificate: { type: String }, // store image file path or URL
    profileImage: { type: String }, // store image file path or URL
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
