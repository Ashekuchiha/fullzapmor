const ServiceLocation = require('../models/serviceLocation');

// Create a new service location
exports.createServiceLocation = async (req, res) => {
  try {
    const { locname, location, address } = req.body;

    const newServiceLocation = new ServiceLocation({ locname, location, address });
    const savedLocation = await newServiceLocation.save();

    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all service locations
exports.getServiceLocations = async (req, res) => {
  try {
    const serviceLocations = await ServiceLocation.find();
    res.status(200).json(serviceLocations);
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
