const FeatureTable = require('../models/FeatureTable');
const path = require('path');

// Get all entries
exports.getFeatures = async (req, res) => {
    try {
        const features = await FeatureTable.find();
        res.status(200).json(features);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new entry
exports.createFeature = async (req, res) => {
    try {
        const { name, description, feature } = req.body;
        const icon = req.file ? req.file.path : null; // Get the file path for the uploaded icon

        const newFeature = new FeatureTable({
            name,
            description,
            feature: feature === '1' ? true : false, // Convert 1 or 0 to true or false
            icon
        });

        await newFeature.save();
        res.status(201).json(newFeature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get an entry by ID
exports.getFeatureById = async (req, res) => {
    try {
        const feature = await FeatureTable.findById(req.params.id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json(feature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an entry
exports.updateFeature = async (req, res) => {
    try {
        const { name, description, feature } = req.body;
        const icon = req.file ? req.file.path : null;

        const updatedFeature = await FeatureTable.findByIdAndUpdate(req.params.id, {
            name,
            description,
            feature: feature === '1' ? true : false,
            icon: icon || undefined
        }, { new: true });

        if (!updatedFeature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json(updatedFeature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an entry
exports.deleteFeature = async (req, res) => {
    try {
        const feature = await FeatureTable.findByIdAndDelete(req.params.id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json({ message: 'Feature deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
