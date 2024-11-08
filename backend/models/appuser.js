const mongoose = require('mongoose');

const appUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    city:{
        type:String,
    },
    profile: {
        type: String, // will store the path to the image
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('AppUser', appUserSchema);
