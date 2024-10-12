const mongoose = require('mongoose');

const featureTableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    feature: {
        type: Boolean,
        required: true,
        default: false
    },
    icon: {
        type: String, // Store the file path of the image
        required: true
    }
}, {
    timestamps: true
});

const FeatureTable = mongoose.model('FeatureTable', featureTableSchema);
module.exports = FeatureTable;
