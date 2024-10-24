// controllers/serviceController.js
const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose'); 

// Get all services
// exports.getAllServices = async (req, res) => {
//     try {
//         const services = await Service.find();
//         res.json(services);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching services', error });
//     }
// };

exports.getAllServices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
        const totalServices = await Service.countDocuments(); // Get total user count

        // Calculate the users for the current page
        const services = await Service.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        const formattedServices = services.map(service => ({
            id: service._id,
            name: service.name,
            description: service.description,
            featured: service.featured === true ? 'ON': 'OFF',
            icon: service.icon,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        }));

        const totalPages = Math.ceil(totalServices / perPage); // Total number of pages
        const response = {
            success: true,
            data: {
                current_page: page,
                data: formattedServices,
                total: totalServices,
                per_page: perPage,
                last_page: totalPages,
                from: (page - 1) * perPage + 1,
                to: Math.min(page * perPage, totalServices),
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
            message: "Users retrieved successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

    // if (!icon) {
    //     return res.status(400).json({ message: 'Icon is required' });
    // }

    try {
        const newService = new Service({
            name,
            description,
            featured,
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
            featured
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

        if (service.icon) {
            fs.unlink(path.join(__dirname,'..', service.icon), (err) => {
                if (err) console.log(err);
            });
        }
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
};

//Delet multiple services by ID

exports.deleteMultipleservice = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of service IDs in the request body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, error: 'No service IDs provided' });
        }

        // Validate that each id is a valid ObjectId
        const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length !== ids.length) {
            return res.status(400).json({ success: false, error: 'One or more IDs are invalid' });
        }

        // Find the services to get the icon file paths before deletion
        const services = await Service.find({ _id: { $in: validIds } });
        
        // Delete the associated icon files
        services.forEach(service => {
            if (service.icon) {
                const iconPath = path.join(__dirname, '..', service.icon);
                fs.unlink(iconPath, (err) => {
                    if (err) console.log(`Error deleting icon file for service ${service._id}:`, err);
                });
            }
        });

        // Delete services by their IDs
        const result = await Service.deleteMany({ _id: { $in: validIds } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} services deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
