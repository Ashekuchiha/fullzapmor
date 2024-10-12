// routes/serviceRoutes.js
const express = require('express');
const multer = require('multer');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

// Multer setup for file uploads (assuming 'uploads/' folder exists)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Service routes
router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/services', upload.single('icon'), serviceController.createService);
router.put('/services/:id', upload.single('icon'), serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;
