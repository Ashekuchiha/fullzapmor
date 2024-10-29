// controllers/serviceOrganizationController.js
const ServiceOrganization = require('../models/ServiceOrganization');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Create a new Service Organization
// exports.createServiceOrganization = async (req, res) => {
//     try {
//         const { organizationName, ownerName, state, city, address, organizationBio, organizationDescription, organizationWebsite, phoneNumber, emergencyPhoneNumber, employeeNumbers, mapSelection } = req.body;
//         if (typeof mapSelection === 'string') {
//             req.body.mapSelection = JSON.parse(mapSelection);
//         }
//         const newOrganization = new ServiceOrganization({
//             organizationName,
//             ownerName,
//             state,
//             city,
//             address,
//             organizationBio,
//             organizationDescription,
//             organizationWebsite,
//             phoneNumber,
//             emergencyPhoneNumber,
//             employeeNumbers,
//             mapSelection,
//             organizationLogo: req.files.organizationLogo ? req.files.organizationLogo[0].path : null,
//             organizationBanner: req.files.organizationBanner ? req.files.organizationBanner[0].path : null,
//             tradeLicense: req.files.tradeLicense ? req.files.tradeLicense[0].path : null,
//             organizationDocuments: req.files.organizationDocuments ? req.files.organizationDocuments[0].path : null
//         });

//         await newOrganization.save();

//         res.status(201).json({ success: true, message: 'Service organization created successfully', data: newOrganization });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };


exports.createServiceOrganization = async (req, res) => {
    try {
        // Extract fields from the request body
        const {
            organizationName,
            ownerName,
            state,
            city,
            address,
            organizationBio,
            organizationDescription,
            organizationWebsite,
            phoneNumber,
            emergencyPhoneNumber,
            employeeNumbers
        } = req.body;

        // Parse mapSelection as an array if it’s received as a string
        let mapSelection = req.body.mapSelection;
        if (typeof mapSelection === 'string') {
            mapSelection = JSON.parse(mapSelection);
        }

        // Get file paths from Multer's file upload
        const organizationLogo = req.files['organizationLogo']
            ? req.files['organizationLogo'][0].path
            : null;

        const organizationBanner = req.files['organizationBanner']
            ? req.files['organizationBanner'][0].path
            : null;

        const tradeLicense = req.files['tradeLicense']
            ? req.files['tradeLicense'][0].path
            : null;

        const organizationDocuments = req.files['organizationDocuments']
            ? req.files['organizationDocuments'][0].path
            : null;

        // Create a new service organization
        const newOrganization = new ServiceOrganization({
            organizationName,
            ownerName,
            state,
            city,
            address,
            mapSelection,
            organizationBio,
            organizationDescription,
            organizationWebsite,
            phoneNumber,
            emergencyPhoneNumber,
            employeeNumbers,
            organizationLogo,
            organizationBanner,
            tradeLicense,
            organizationDocuments
        });

        // Save to database
        await newOrganization.save();

        res.status(201).json({
            success: true,
            message: 'Service organization created successfully',
            data: newOrganization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create service organization',
            error: error.message
        });
    }
};

//get all without pagination

//get all data with structure
exports.getAllOrganizationNames = async (req, res) => {
    try {
        // Fetch all service organizations from the database, but only select the `organizationName` field
        const organizations = await ServiceOrganization.find({}, 'organizationName'); // Only fetch the 'organizationName' field

        // Extract only the organizationName field for each organization
        const names = organizations.map(org => org.organizationName);

        // Send the response as an array of organization names
        res.status(200).json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Service Organizations with pagination
exports.getAllServiceOrganizations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const perPage = parseInt(req.query.per_page) || 5; 
        const totalOrganizations = await ServiceOrganization.countDocuments();

        const organizations = await ServiceOrganization.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        const formattedOrganizations = organizations.map(organization => ({
            id: organization._id,
            organizationName: organization.organizationName,
            ownerName: organization.ownerName,
            state: organization.state,
            city: organization.city,
            mapSelection:organization.mapSelection,
            address: organization.address,
            organizationBio: organization.organizationBio,
            organizationDescription: organization.organizationDescription,
            organizationWebsite: organization.organizationWebsite,
            phoneNumber: organization.phoneNumber,
            emergencyPhoneNumber: organization.emergencyPhoneNumber,
            employeeNumbers: organization.employeeNumbers,
            organizationLogo: organization.organizationLogo,
            organizationBanner: organization.organizationBanner,
            tradeLicense: organization.tradeLicense,
            organizationDocuments: organization.organizationDocuments,
            location: organization.location,
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt
        }));

        const totalPages = Math.ceil(totalOrganizations / perPage);
        const response = {
            success: true,
            data: {
                current_page: page,
                data: formattedOrganizations,
                total: totalOrganizations,
                per_page: perPage,
                last_page: totalPages,
                from: (page - 1) * perPage + 1,
                to: Math.min(page * perPage, totalOrganizations),
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
            message: "Service organizations retrieved successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Service Organization by ID
exports.getServiceOrganizationById = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid organization ID' });
        }

        const organization = await ServiceOrganization.findById(id);
        
        if (!organization) {
            return res.status(404).json({ success: false, error: 'Organization not found' });
        }

        res.status(200).json({ success: true, data: organization });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a Service Organization by ID
exports.updateServiceOrganization = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid organization ID' });
        }

        const updates = {
            ...req.body,
            organizationLogo: req.files.organizationLogo ? req.files.organizationLogo[0].path : undefined,
            organizationBanner: req.files.organizationBanner ? req.files.organizationBanner[0].path : undefined,
            tradeLicense: req.files.tradeLicense ? req.files.tradeLicense[0].path : undefined,
            organizationDocuments: req.files.organizationDocuments ? req.files.organizationDocuments[0].path : undefined
        };

        const updatedOrganization = await ServiceOrganization.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedOrganization) {
            return res.status(404).json({ success: false, error: 'Organization not found' });
        }

        res.status(200).json({ success: true, message: 'Service organization updated successfully', data: updatedOrganization });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a Service Organization by ID
exports.deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid organization ID' });
        }

        // Find the organization to get file paths before deletion
        const organization = await ServiceOrganization.findById(id);
        
        if (!organization) {
            return res.status(404).json({ success: false, error: 'Organization not found' });
        }

        // Delete associated image files for the organization
        const filesToDelete = [
            organization.organizationLogo,
            organization.organizationBanner,
            organization.tradeLicense,
            organization.organizationDocuments
        ];
        
        filesToDelete.forEach(filePath => {
            if (filePath) {
                const absolutePath = path.join(__dirname, '..', filePath);
                fs.unlink(absolutePath, (err) => {
                    if (err) console.log(`Error deleting file ${filePath} for organization ${organization._id}:`, err);
                });
            }
        });

        // Delete the organization
        await ServiceOrganization.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Delete multiple Service Organizations
exports.deleteMultipleServiceOrganizations = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of service organization IDs in the request body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, error: 'No organization IDs provided' });
        }

        // Validate that each id is a valid ObjectId
        const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length !== ids.length) {
            return res.status(400).json({ success: false, error: 'One or more IDs are invalid' });
        }

        // Find the organizations to get file paths before deletion
        const organizations = await ServiceOrganization.find({ _id: { $in: validIds } });
        
        // Delete associated image files for each organization
        organizations.forEach(organization => {
            const filesToDelete = [
                organization.organizationLogo,
                organization.organizationBanner,
                organization.tradeLicense,
                organization.organizationDocuments
            ];
            
            filesToDelete.forEach(filePath => {
                if (filePath) {
                    const absolutePath = path.join(__dirname, '..', filePath);
                    fs.unlink(absolutePath, (err) => {
                        if (err) console.log(`Error deleting file ${filePath} for organization ${organization._id}:`, err);
                    });
                }
            });
        });

        // Delete organizations by their IDs
        const result = await ServiceOrganization.deleteMany({ _id: { $in: validIds } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} organizations deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
