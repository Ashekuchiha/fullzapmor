const ServiceProvider = require('../../models/ServiceProvider'); // Adjust the path as needed
const ServiceOrganization = require('../../models/ServiceOrganization'); // Adjust path as needed
const City = require('../../models/cities'); // Adjust path as needed

// Controller to get vendors by service type

// const getVendorsByService = async (req, res) => {
//   try {
//     const { serviceType } = req.query;

//     if (!serviceType) {
//       return res.status(400).json({ message: 'Service type is required.' });
//     }

//     // Find vendors matching the provided service type
//     const vendors = await ServiceProvider.find({ service: serviceType });

//     // Map the result to the desired format
//     const formattedVendors = vendors.map(vendor => ({
//       pic: vendor.profileImage,
//       name: vendor.name,
//       id: vendor._id,
//     }));

//     return res.status(200).json(formattedVendors);
//   } catch (error) {
//     console.error('Error fetching service-wise vendors:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

const getVendorsByService = async (req, res) => {
    try {
      const serviceType = req.params.serviceType; // Get service type from URL parameter
  
      if (!serviceType) {
        return res.status(400).json({ message: 'Service type is required.' });
      }
  
      // Find vendors matching the provided service type
      const vendors = await ServiceProvider.find({ service: serviceType });
  
      // Map the result to the desired format
      const formattedVendors = vendors.map(vendor => ({
        pic: vendor.profileImage,
        name: vendor.name,
        id: vendor._id,
      }));
      return res.status(200).json(formattedVendors);
    } catch (error) {
      console.error('Error fetching service-wise vendors:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  // Controller to get vendors by organization
const getVendorsByOrganization = async (req, res) => {
    try {
      const organizationName = req.params.organizationName; // Get organization name from URL parameter
  
      if (!organizationName) {
        return res.status(400).json({ message: 'Organization name is required.' });
      }
  
      // Find vendors matching the provided organization name
      const vendors = await ServiceProvider.find({ serviceOrganization: organizationName });
  
      // Map the result to the desired format
      const formattedVendors = vendors.map(vendor => ({
        pic: vendor.profileImage,
        name: vendor.name,
        id: vendor._id,
      }));
  
      return res.status(200).json(formattedVendors);
    } catch (error) {
      console.error('Error fetching organization-wise vendors:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

  // Controller to get vendors by city and organization ID
const getVendorsByCityAndOrganization = async (req, res) => {
  try {
    const { city, organizationId } = req.params;

    // Find the city document based on the city name provided
    const cityDoc = await City.findOne({ cityName: city });

    if (!cityDoc) {
      return res.status(404).json({ message: 'City not found.' });
    }

    // Find the organization under the specified city and organizationId
    const organization = await ServiceOrganization.findOne({
      _id: organizationId,
      city: cityDoc.cityName,
    });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found in the specified city.' });
    }

    // Find service providers under the selected organization
    const serviceProviders = await ServiceProvider.find({
      serviceOrganization: organization.organizationName,
    });

    // Format the service providers' data to the required output structure
    const formattedProviders = serviceProviders.map(provider => ({
      pic: provider.profileImage,
      name: provider.name,
      id: provider._id,
    }));

    return res.status(200).json(formattedProviders);
  } catch (error) {
    console.error('Error fetching city and organization-wise vendors:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

  module.exports = { getVendorsByService, getVendorsByOrganization, getVendorsByCityAndOrganization };
