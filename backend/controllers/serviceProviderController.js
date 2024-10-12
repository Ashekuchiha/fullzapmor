const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Get all service providers
exports.getAllServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json(serviceProviders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single service provider by ID
exports.getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service provider not found' });
        res.status(200).json(serviceProvider);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new service provider
exports.createServiceProvider = async (req, res) => {
    try {
        const { name, service, specialization, experience, location, phnnumber, email, password, status } = req.body;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const serviceProvider = new ServiceProvider({
            name,
            service,
            specialization,
            experience,
            location,
            phnnumber,
            email,
            password: hashedPassword,
            status,
            certificate: req.files?.certificate?.path,
            profileImage: req.files?.profileImage?.path
        });

        await serviceProvider.save();
        res.status(201).json(serviceProvider);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update service provider by ID
exports.updateServiceProvider = async (req, res) => {
    try {
        const updates = { ...req.body };
        
        // Update password if provided
        if (req.body.password) {
            updates.password = await bcrypt.hash(req.body.password, 10);
        }

        if (req.files?.certificate) updates.certificate = req.files.certificate.path;
        if (req.files?.profileImage) updates.profileImage = req.files.profileImage.path;

        const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!serviceProvider) return res.status(404).json({ message: 'Service provider not found' });

        res.status(200).json(serviceProvider);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete service provider by ID
exports.deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) return res.status(404).json({ message: 'Service provider not found' });

        // Optionally delete files if needed
        if (serviceProvider.certificate) fs.unlinkSync(serviceProvider.certificate);
        if (serviceProvider.profileImage) fs.unlinkSync(serviceProvider.profileImage);

        await serviceProvider.deleteOne();
        res.status(200).json({ message: 'Service provider deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
