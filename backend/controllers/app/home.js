const Service = require('../../models/Service'); // Mongoose model for the `services` collection
const ServiceOrganization = require('../../models/ServiceOrganization'); // Mongoose model for the `serviceorganization` collection

// Controller to get data in the specified JSON format
const getDataInCustomFormat = async (req, res) => {
  try {
    // Fetch doctors and clinics from the `services` collection
    const doctors = await Service.find({ name: "Doctors" });
    const clinics = await Service.find({ name: "Clinic" });

    // Fetch organizations from the `serviceorganization` collection
    const organizations = await ServiceOrganization.find();

    // Format the data to match the required JSON structure
    const data = {
      Doctors: doctors.map(doctor => ({
        pic: doctor.icon || "", // Assuming `icon` field stores the pic URL
        name: doctor.name,
        id: doctor._id.toString()
      })),
      Clinics: clinics.map(clinic => ({
        pic: clinic.icon || "", // Assuming `icon` field stores the pic URL
        name: clinic.name,
        id: clinic._id.toString()
      })),
      Organisations: organizations.map(org => ({
        pic: org.organizationLogo || "", // Assuming `organizationLogo` stores the pic URL
        name: org.organizationName,
        id: org._id.toString()
      }))
    };

    // Send the formatted data as JSON
    res.json(data);

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDataInCustomFormat
};
