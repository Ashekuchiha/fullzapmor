const mongoose = require('mongoose');

const ServiceOrganizationSchema = new mongoose.Schema({
    organizationName: { type: String, required: false },
    ownerName: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    mapSelection: { type: [String], required: true },  // [latitude, longitude]
    organizationBio: { type: String },
    organizationDescription: { type: String },
    organizationWebsite: { type: String },
    phoneNumber: { type: String },
    emergencyPhoneNumber: { type: String },
    employeeNumbers: { type: String },
    organizationLogo: { type: String },  // path to logo image
    organizationBanner: { type: String },  // path to banner image
    tradeLicense: { type: String },  // path to trade license image
    organizationDocuments: { type: String },  // path to documents image
});

module.exports = mongoose.model('ServiceOrganization', ServiceOrganizationSchema);
