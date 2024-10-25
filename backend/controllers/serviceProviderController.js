const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcrypt');
const fs = require('fs');
const mongoose = require('mongoose'); 

// Get all service providers
// exports.getAllServiceProviders = async (req, res) => {
//     try {
//         const serviceProviders = await ServiceProvider.find();
//         res.status(200).json(serviceProviders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
exports.getAllServiceProviders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
        const totalServiceProvider = await ServiceProvider.countDocuments(); // Get total user count

        // Calculate the users for the current page
        const serviceProvider = await ServiceProvider.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        const formattedserviceProvider = serviceProvider.map(user => ({
            id: user._id,
            name: user.name,
            service: user.service,
            specialization: user.specialization,
            experience: user.experience,
            location: user.location,
            phnnumber: user.phnnumber,
            email: user.email,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        const totalPages = Math.ceil(totalServiceProvider / perPage); // Total number of pages
        const response = {
            success: true,
            data: {
                current_page: page,
                data: formattedserviceProvider,
                total: totalServiceProvider,
                per_page: perPage,
                last_page: totalPages,
                from: (page - 1) * perPage + 1,
                to: Math.min(page * perPage, totalServiceProvider),
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
            message: "service Provider retrieved successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
