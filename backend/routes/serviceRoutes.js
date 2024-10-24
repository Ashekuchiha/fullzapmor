// routes/serviceRoutes.js
const express = require('express');
const multer = require('multer');
const serviceController = require('../controllers/serviceController');

const router = express.Router();
const uploadc = require('../middlewares/uploadMiddleware')
// Multer setup for file uploads (assuming 'uploads/' folder exists)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/servicesIcons');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Service routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', uploadc.single('icon'), serviceController.createService);
router.put('/:id', uploadc.single('icon'), serviceController.updateService);
router.delete('/delete-multiple', serviceController.deleteMultipleservice);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
