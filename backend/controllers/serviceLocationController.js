const ServiceLocation = require('../models/serviceLocation');
const mongoose = require('mongoose'); 

// Create a new service location
exports.createServiceLocation = async (req, res) => {
  try {
    const { locname, location, address } = req.body;
console.log(req.body)
    const newServiceLocation = new ServiceLocation({ locname, location, address });
    const savedLocation = await newServiceLocation.save();

    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all service locations
// exports.getServiceLocations = async (req, res) => {
//   try {
//     const serviceLocations = await ServiceLocation.find();
//     res.status(200).json(serviceLocations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getServiceLocations = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
      const totalLocations = await ServiceLocation.countDocuments(); // Get total count of service locations

      // Get paginated service locations
      const serviceLocations = await ServiceLocation.find()
          .skip((page - 1) * perPage)
          .limit(perPage);

      // Format the locations data
      const formattedLocations = serviceLocations.map(location => ({
          id: location._id,
          locname: location.locname,
          location: location.location,
          address: location.address,
          createdAt: location.createdAt,
          updatedAt: location.updatedAt
      }));

      const totalPages = Math.ceil(totalLocations / perPage);

      const response = {
          success: true,
          data: {
              current_page: page,
              data: formattedLocations,
              total: totalLocations,
              per_page: perPage,
              last_page: totalPages,
              from: (page - 1) * perPage + 1,
              to: Math.min(page * perPage, totalLocations),
              first_page_url: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=1&per_page=${perPage}`,
              last_page_url: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${totalPages}&per_page=${perPage}`,
              next_page_url: page < totalPages ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${page + 1}&per_page=${perPage}` : null,
              prev_page_url: page > 1 ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${page - 1}&per_page=${perPage}` : null,
              links: Array.from({ length: totalPages }, (_, i) => ({
                  url: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${i + 1}&per_page=${perPage}`,
                  label: `${i + 1}`,
                  active: i + 1 === page
              }))
          },
          message: "Service locations retrieved successfully."
      };

      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Get a single service location by ID
exports.getServiceLocationById = async (req, res) => {
  try {
    const serviceLocation = await ServiceLocation.findById(req.params.id);
    if (!serviceLocation) {
      return res.status(404).json({ message: 'Service Location not found' });
    }
    res.status(200).json(serviceLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service location by ID
exports.updateServiceLocation = async (req, res) => {
  try {
    const { locname, location, address } = req.body;
    const updatedServiceLocation = await ServiceLocation.findByIdAndUpdate(
      req.params.id,
      { locname, location, address },
      { new: true, runValidators: true }
    );
    if (!updatedServiceLocation) {
      return res.status(404).json({ message: 'Service Location not found' });
    }
    res.status(200).json(updatedServiceLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service location by ID
exports.deleteServiceLocation = async (req, res) => {
  try {
    const deletedServiceLocation = await ServiceLocation.findByIdAndDelete(req.params.id);
    if (!deletedServiceLocation) {
      return res.status(404).json({ message: 'Service Location not found' });
    }
    res.status(200).json({ message: 'Service Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMultipleServiceLocation = async (req, res) => {
  try {
      const { ids } = req.body; // Expecting an array of service IDs in the request body

      if (!Array.isArray(ids) || ids.length === 0) {
          return res.status(400).json({ success: false, error: 'No ServiceLocation IDs provided' });
      }

      // Validate that each id is a valid ObjectId
      const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
      if (validIds.length !== ids.length) {
          return res.status(400).json({ success: false, error: 'One or more IDs are invalid' });
      }

      // Find the ServiceLocations to get the icon file paths before deletion
      const ServiceLocations = await ServiceLocation.find({ _id: { $in: validIds } });
      
      // Delete the associated icon files
      ServiceLocations.forEach(ServiceLocation => {
          if (ServiceLocation.icon) {
              const iconPath = path.join(__dirname, '..', ServiceLocation.icon);
              fs.unlink(iconPath, (err) => {
                  if (err) console.log(`Error deleting icon file for ServiceLocation ${ServiceLocation._id}:`, err);
              });
          }
      });

      // Delete ServiceLocations by their IDs
      const result = await ServiceLocation.deleteMany({ _id: { $in: validIds } });

      res.status(200).json({
          success: true,
          message: `${result.deletedCount} ServiceLocations deleted successfully`
      });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};