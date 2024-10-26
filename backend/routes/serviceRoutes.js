const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Configure multer for image upload

const serviceController = require('../controllers/serviceController');

// POST: Create a new service
router.post('/', upload.single('icon'), serviceController.createService);

// GET: Get all services
router.get('/', serviceController.getAllServices);

// GET: Get a service by ID
router.get('/:id', serviceController.getServiceById);

// PUT: Update a service by ID
router.put('/:id', upload.single('icon'), serviceController.updateService);

// DELETE: Delete a service by ID
router.delete('/delete-multiple', serviceController.deleteMultipleservice);

router.delete('/:id', serviceController.deleteService);

module.exports = router;
