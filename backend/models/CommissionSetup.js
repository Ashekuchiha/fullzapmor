const mongoose = require('mongoose');

const CommissionSetupSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CommissionSetup', CommissionSetupSchema);
