const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
    service: { type: String, required: false }, // array of multiple values
    specialized: { type: String, required: false },
    experience: { type: String, required: false},
    serviceOrganization: { type: [String], required: false },
    status: { type: String },
    amount:{type: String},
    type:{type:String},
    assistantName:{type:String},
    assistantphoneNumber:{type:String},
    qualification:{type:String},
    organizationMobile:{type:String},
    featured: { type: Boolean, default: false },
    certificate: { type: String }, // store image file path or URL
    profileImage: { type: String }, // store image file path or URL
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
