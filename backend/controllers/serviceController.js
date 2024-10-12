// controllers/serviceController.js
const Service = require('../models/Service');

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error });
    }
};

// Create a new service
exports.createService = async (req, res) => {
    const { name, description, featured } = req.body;
    const icon = req.file ? req.file.path : null; // Assuming file upload middleware like multer

    if (!icon) {
        return res.status(400).json({ message: 'Icon is required' });
    }

    try {
        const newService = new Service({
            name,
            description,
            featured: featured === '1' ? true : false,
            icon
        });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    const { name, description, featured } = req.body;
    const icon = req.file ? req.file.path : null;

    try {
        const updatedData = {
            name,
            description,
            featured: featured === '1' ? true : false,
        };

        if (icon) {
            updatedData.icon = icon;
        }

        const service = await Service.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
};
