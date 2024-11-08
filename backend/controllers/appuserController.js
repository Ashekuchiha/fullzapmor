const mongoose = require('mongoose'); 

const AppUser = require('../models/appuser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Create a new app user
exports.createAppUser = async (req, res) => {
    try {
        const { name, email, phone,dob,city, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const appUser = new AppUser({
            name,
            email,
            phone,
            // address,
            dob,
            city,
            password: hashedPassword,
            profile: req.file ? req.file.path : ''
        });

        const savedUser = await appUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all app users
// exports.getAppUsers = async (req, res) => {
//     try {
//         const users = await AppUser.find();
//         const formattedUsers = users.map(user => ({
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             address: user.address,
//             profile: user.profile,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt
//         }));

//         const response = {
//             success: true,
//             data: {
//                 current_page: 1,  // Hardcoded for now
//                 data: formattedUsers
//             }
//         };

//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getAppUsers = async (req, res) => {
//     try {
//         // Get pagination parameters from the query
//         const page = parseInt(req.query.page) || 1; // Default to page 1
//         const perPage = parseInt(req.query.per_page) || 10; // Default to 10 items per page
//         const totalUsers = await AppUser.countDocuments(); // Get total number of users

//         // Fetch users with pagination
//         const users = await AppUser.find()
//             .skip((page - 1) * perPage) // Skip the number of documents based on page
//             .limit(perPage); // Limit the number of documents returned

//         const formattedUsers = users.map(user => ({
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             address: user.address,
//             profile: user.profile,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt
//         }));

//         const response = {
//             success: true,
//             data: {
//                 current_page: page,
//                 total_users: totalUsers,
//                 per_page: perPage,
//                 data: formattedUsers
//             }
//         };

//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getAppUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
        const totalUsers = await AppUser.countDocuments(); // Get total user count

        // Calculate the users for the current page
        const users = await AppUser.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        const formattedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            // address: user.address,
            dob: user.dob,
            city: user.city,
            profile: user.profile,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        const totalPages = Math.ceil(totalUsers / perPage); // Total number of pages
        const response = {
            success: true,
            data: {
                current_page: page,
                data: formattedUsers,
                total: totalUsers,
                per_page: perPage,
                last_page: totalPages,
                from: (page - 1) * perPage + 1,
                to: Math.min(page * perPage, totalUsers),
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

// Get a single app user by ID
exports.getAppUserById = async (req, res) => {
    try {
        const user = await AppUser.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update app user by ID
exports.updateAppUser = async (req, res) => {
    try {
        const { name, email, phone, dob,city, } = req.body;
        let updatedData = { name, email, phone, dob,city, };

        if (req.file) {
            updatedData.profile = req.file.path;
        }

        const updatedUser = await AppUser.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete app user by ID
exports.deleteAppUser = async (req, res) => {
    try {
        const user = await AppUser.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Remove profile image if exists
        if (user.profile) {
            fs.unlink(path.join(__dirname, '..', user.profile), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete multiple users by ID
exports.deleteMultipleAppUsers = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of user IDs in the request body
        
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, error: 'No user IDs provided' });
        }

        // Validate that each id is a valid ObjectId
        const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length !== ids.length) {
            return res.status(400).json({ success: false, error: 'One or more IDs are invalid' });
        }

        // Delete users by their IDs
        const result = await AppUser.deleteMany({ _id: { $in: validIds } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} users deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
