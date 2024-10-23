const State = require('../models/State');
const mongoose = require('mongoose'); 

// Get all states

// exports.getAllStates = async (req, res) => {
//     try {
//         const states = await State.find();
//         res.status(200).json(states);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getAllStatesAll = async (req, res) => {
    try {
        const States = await State.find(); // Fetch all service locations

        const formattedStates = States.map(State => ({
            id: State._id,
            StateName: State.StateName,
            longitude: State.longitude,
            latitude: State.latitude,
            createdAt: State.createdAt,
            updatedAt: State.updatedAt
        }));

        const response = {
            success: true,
            data: {
                data: formattedStates,
                total: formattedStates.length
            },
            message: "Service locations retrieved successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get with pagination
exports.getAllStates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
        const totalStates = await State.countDocuments(); // Get total user count

        // Calculate the users for the current page
        const States = await State.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        const formattedStates = States.map(State => ({
            id: State._id,
            StateName: State.StateName,
            longitude: State.longitude,
            latitude: State.latitude,
            createdAt: State.createdAt,
            updatedAt: State.updatedAt
        }));

        const totalPages = Math.ceil(totalStates / perPage); // Total number of pages
        const response = {
            success: true,
            data: {
                current_page: page,
                data: formattedStates,
                total: totalStates,
                per_page: perPage,
                last_page: totalPages,
                from: (page - 1) * perPage + 1,
                to: Math.min(page * perPage, totalStates),
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

// Get a single state by ID
exports.getStateById = async (req, res) => {
    try {
        const state = await State.findById(req.params.id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new state
exports.createState = async (req, res) => {
    const { StateName, longitude, latitude } = req.body;

    const newState = new State({
        StateName,
        longitude,
        latitude
    });

    try {
        const savedState = await newState.save();
        res.status(201).json(savedState);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing state
exports.updateState = async (req, res) => {
    try {
        const updatedState = await State.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    StateName: req.body.StateName,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                }
            },
            { new: true }
        );
        if (!updatedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json(updatedState);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a state
exports.deleteState = async (req, res) => {
    try {
        const deletedState = await State.findByIdAndDelete(req.params.id);
        if (!deletedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delet multiple services by ID

exports.deleteMultipleStates = async (req, res) => {
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
        const States = await State.find({ _id: { $in: validIds } });
        
        // Delete the associated icon files
        States.forEach(State => {
            if (State.icon) {
                const iconPath = path.join(__dirname, '..', State.icon);
                fs.unlink(iconPath, (err) => {
                    if (err) console.log(`Error deleting icon file for State ${State._id}:`, err);
                });
            }
        });

        // Delete States by their IDs
        const result = await State.deleteMany({ _id: { $in: validIds } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} States deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
