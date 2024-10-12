const express = require('express');
const router = express.Router();
const commissionSetupController = require('../controllers/commissionSetupController');

// Get all commission setups
router.get('/', commissionSetupController.getAllCommissionSetups);

// Get a single commission setup by ID
router.get('/:id', commissionSetupController.getCommissionSetupById);

// Create a new commission setup
router.post('/', commissionSetupController.createCommissionSetup);

// Update a commission setup by ID
router.put('/:id', commissionSetupController.updateCommissionSetup);

// Delete a commission setup by ID
router.delete('/:id', commissionSetupController.deleteCommissionSetup);

module.exports = router;
