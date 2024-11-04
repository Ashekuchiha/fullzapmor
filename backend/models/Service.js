const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    icon: { type: String },  // URL or path to the uploaded image
    featured: { type: Boolean, default: false },
    status: { type: String,default: "Active" },
    amount: { type: Number, required: false },
    type: { type: String, required: false }
});

module.exports = mongoose.model('Service', serviceSchema);
