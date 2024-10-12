const express = require('express');
const router = express.Router();
const serviceLocationController = require('../controllers/serviceLocationController');

// Create a new service location
router.post('/', serviceLocationController.createServiceLocation);

// Get all service locations
router.get('/', serviceLocationController.getServiceLocations);

// Get a service location by ID
router.get('/:id', serviceLocationController.getServiceLocationById);

// Update a service location by ID
router.put('/:id', serviceLocationController.updateServiceLocation);

// Delete a service location by ID
router.delete('/:id', serviceLocationController.deleteServiceLocation);

module.exports = router;
