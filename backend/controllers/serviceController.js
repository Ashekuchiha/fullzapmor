
const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
// Create a new service
exports.createService = async (req, res) => {
    try {
        const { name, description, featured, status, amount, type } = req.body;
        const icon = req.file ? req.file.path : null; // assuming multer is used for image upload
        
        const service = new Service({ name, description, icon, featured, status, amount, type });
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all services
exports.getServicesAll = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//pagi
exports.getAllServices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
        const totalServices = await Service.countDocuments(); // Get total service count

        // Calculate the services for the current page
        const services = await Service.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        // Format services
        const formattedServices = services.map(service => ({
            id: service._id,
            name: service.name,
            description: service.description,
            icon: service.icon,
            featured: service.featured ? 'Yes' : 'No',
            status: service.status,
            amount: service.amount,
            type: service.type,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
        }));

        // Calculate total pages
        const totalPages = Math.ceil(totalServices / perPage);

        // Construct pagination URLs
        const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;
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
                first_page_url: `${baseUrl}?page=1&per_page=${perPage}`,
                last_page_url: `${baseUrl}?page=${totalPages}&per_page=${perPage}`,
                next_page_url: page < totalPages ? `${baseUrl}?page=${page + 1}&per_page=${perPage}` : null,
                prev_page_url: page > 1 ? `${baseUrl}?page=${page - 1}&per_page=${perPage}` : null,
                links: Array.from({ length: totalPages }, (_, i) => ({
                    url: `${baseUrl}?page=${i + 1}&per_page=${perPage}`,
                    label: `${i + 1}`,
                    active: i + 1 === page
                }))
            },
            message: "Services retrieved successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
//only data
// exports.getAllServicesAll = async (req, res) => {
//     try {
//         // Fetch all services from the database
//         const services = await Service.find();

//         // Format each service record
//         const formattedServices = services.map(service => ({
//             id: service._id,
//             name: service.name,
//             description: service.description,
//             featured: service.featured ? 'Yes' : 'No', // Format boolean as "Yes" or "No"
//             icon: service.icon, // Assumes the icon is stored as a path or URL
//             status: service.status,
//             amount: service.amount,
//             type: service.type,
//             createdAt: service.createdAt,
//             updatedAt: service.updatedAt
//         }));

//         // Build the response structure
//         const response = {
//             data: formattedServices,
//             // success: true,
//             // data: {
//             //     data: formattedServices,
//             //     total: formattedServices.length
//             // },
//             // message: "Services retrieved successfully."
//         };

//         // Send the response
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.getAllServicesAll = async (req, res) => {
    try {
        // Fetch all services from the database, but only select the `name` field
        const services = await Service.find({}, 'name'); // Only fetch the 'name' field for each service

        // Extract only the name field for each service
        const names = services.map(service => service.name);

        // Send the response as an array of names
        res.status(200).json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get a service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    try {
        const { name, description, featured, status, amount, type } = req.body;
        const icon = req.file ? req.file.path : null;

        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { name, description, icon, featured, status, amount, type },
            { new: true }
        );
        
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        if (service.icon) {
            const iconPath = path.join(__dirname, '..', service.icon);
            fs.unlink(iconPath, (err) => {
                if (err) console.log(`Error deleting icon file for service ${service._id}:`, err);
            });
        }
        
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteMultipleservice = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of service IDs in the request body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, error: 'No service IDs provided' });
        }

        // Validate that each ID is a valid ObjectId
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
