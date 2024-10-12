const CommissionSetup = require('../models/CommissionSetup');

// Get all commission setups
exports.getAllCommissionSetups = async (req, res) => {
    try {
        const commissionSetups = await CommissionSetup.find();
        const formattedData = commissionSetups.map(commissionSetup =>({
            id:commissionSetup._id,
            amount:commissionSetup.amount,
            type:commissionSetup.type,
        }));
        const response = {
            success: true,
            data:{
                current_page:1,
                data:formattedData
            }
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single commission setup by ID
exports.getCommissionSetupById = async (req, res) => {
    try {
        const commissionSetup = await CommissionSetup.findById(req.params.id);
        if (!commissionSetup) {
            return res.status(404).json({ message: 'Commission setup not found' });
        }
        res.status(200).json(commissionSetup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new commission setup
exports.createCommissionSetup = async (req, res) => {
    const { amount, service, type } = req.body;

    const newCommissionSetup = new CommissionSetup({
        amount,
        service,
        type
    });

    try {
        const savedCommissionSetup = await newCommissionSetup.save();
        res.status(201).json(savedCommissionSetup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a commission setup by ID
exports.updateCommissionSetup = async (req, res) => {
    try {
        const updatedCommissionSetup = await CommissionSetup.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCommissionSetup) {
            return res.status(404).json({ message: 'Commission setup not found' });
        }
        res.status(200).json(updatedCommissionSetup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a commission setup by ID
exports.deleteCommissionSetup = async (req, res) => {
    try {
        const deletedCommissionSetup = await CommissionSetup.findByIdAndDelete(req.params.id);
        if (!deletedCommissionSetup) {
            return res.status(404).json({ message: 'Commission setup not found' });
        }
        res.status(200).json({ message: 'Commission setup deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

