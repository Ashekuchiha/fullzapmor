const express = require('express');
const multer = require('multer');
const { 
    getAllServiceProviders,
    getServiceProviderById,
    createServiceProvider,
    updateServiceProvider,
    deleteServiceProvider 
} = require('../controllers/serviceProviderController');

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
router.get('/', getAllServiceProviders);
router.get('/:id', getServiceProviderById);
router.post('/', upload.fields([{ name: 'certificate' }, { name: 'profileImage' }]), createServiceProvider);
router.put('/:id', upload.fields([{ name: 'certificate' }, { name: 'profileImage' }]), updateServiceProvider);
router.delete('/:id', deleteServiceProvider);

module.exports = router;
