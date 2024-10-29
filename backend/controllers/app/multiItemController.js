const MultiItem = require('../../models/app/multiItemModel');
const path = require('path');
const fs = require('fs');

// Create new item
exports.createMultiItem = async (req, res) => {
    try {
        const { name, description, price, discount, discount_type, discount_validity } = req.body;
        const image = req.file ? req.file.path : '';  // Save the image path if uploaded

        const multiItem = new MultiItem({ name, description, price, discount, discount_type, discount_validity, image });
        await multiItem.save();
        res.status(201).json(multiItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all items
exports.getAllMultiItems = async (req, res) => {
    try {
        const multiItems = await MultiItem.find();
        res.status(200).json(multiItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single item by ID
exports.getMultiItemById = async (req, res) => {
    try {
        const multiItem = await MultiItem.findById(req.params.id);
        if (!multiItem) return res.status(404).json({ message: "Item not found" });
        res.status(200).json(multiItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update item by ID
exports.updateMultiItem = async (req, res) => {
    try {
        const { name, description, price, discount, discount_type, discount_validity } = req.body;
        const multiItem = await MultiItem.findById(req.params.id);

        if (!multiItem) return res.status(404).json({ message: "Item not found" });

        if (req.file) {
            if (multiItem.image) fs.unlinkSync(path.join(__dirname, '..', multiItem.image)); // Remove old image
            multiItem.image = req.file.path;
        }

        multiItem.name = name || multiItem.name;
        multiItem.description = description || multiItem.description;
        multiItem.price = price || multiItem.price;
        multiItem.discount = discount || multiItem.discount;
        multiItem.discount_type = discount_type || multiItem.discount_type;
        multiItem.discount_validity = discount_validity || multiItem.discount_validity;

        await multiItem.save();
        res.status(200).json(multiItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete item by ID
exports.deleteMultiItem = async (req, res) => {
    try {
        const multiItem = await MultiItem.findById(req.params.id);
        if (!multiItem) return res.status(404).json({ message: "Item not found" });

        if (multiItem.image) fs.unlinkSync(path.join(__dirname, '..', multiItem.image)); // Remove image
        await multiItem.remove();
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
