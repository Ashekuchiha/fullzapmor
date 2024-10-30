const express = require('express');
const router = express.Router();
const multer = require('multer');
const serviceOrganizationController = require('../controllers/serviceOrganizationController');

// const upload = multer({ dest: 'uploads/serviceOrganization' });  // Configure multer for image upload

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/serviceOrganization'), // Set your upload directory
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });
// const upload = multer({ storage });
const upload = require('../middlewares/cloudinaryMiddleware');


// Create a new organization
router.post(
    '/',
    upload.fields([
        { name: 'organizationLogo', maxCount: 1 },
        { name: 'organizationBanner', maxCount: 1 },
        { name: 'tradeLicense', maxCount: 1 },
        { name: 'organizationDocuments', maxCount: 1 }
    ]),
    serviceOrganizationController.createServiceOrganization
);
// Get all organizations with pagination
router.get('/', serviceOrganizationController.getAllServiceOrganizations);
router.get('/all', serviceOrganizationController.getAllOrganizationNames);

// Get an organization by ID
router.get('/:id', serviceOrganizationController.getServiceOrganizationById);

// Update an organization by ID
// Route to update a Service Organization by ID
router.put(
    '/:id', // Specify the complete path
    upload.fields([
        { name: 'organizationLogo', maxCount: 1 },
        { name: 'organizationBanner', maxCount: 1 },
        { name: 'tradeLicense', maxCount: 1 },
        { name: 'organizationDocuments', maxCount: 1 }
    ]),
    serviceOrganizationController.updateServiceOrganization // Controller method to handle the update
);
// Delete an organization by ID
router.delete('/delete-multiple', serviceOrganizationController.deleteMultipleServiceOrganizations);

router.delete('/:id', serviceOrganizationController.deleteOrganization);

module.exports = router;
