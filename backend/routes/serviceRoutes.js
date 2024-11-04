const express = require('express');
const router = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });  // Configure multer for image upload

const serviceController = require('../controllers/serviceController');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/servicesIcons');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });
const upload = require('../middlewares/cloudinaryMiddleware');


// POST: Create a new service
router.post('/', upload.single('icon'), serviceController.createService);

// GET: Get all services
router.get('/', serviceController.getAllServices);
router.get('/all', serviceController.getAllServicesAll);

// GET: Get a service by ID
router.get('/:id', serviceController.getServiceById);

// PUT: Update a service by ID
router.put('/:id', upload.single('icon'), serviceController.updateService);

// DELETE: Delete a service by ID
router.delete('/delete-multiple', serviceController.deleteMultipleservice);

router.delete('/:id', serviceController.deleteService);

module.exports = router;
