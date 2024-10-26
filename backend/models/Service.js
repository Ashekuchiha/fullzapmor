const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },  // URL or path to the uploaded image
    featured: { type: Boolean, default: false },
    status: { type: String,default: "Active" },
    amount: { type: Number, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);
