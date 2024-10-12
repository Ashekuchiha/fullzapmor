const express = require('express');
const { getFeatures, createFeature, getFeatureById, updateFeature, deleteFeature } = require('../controllers/featureTableController');
const upload = require('../middlewares/fileUpload');

const router = express.Router();

// Define routes
router.get('/', getFeatures);                  // GET all features
router.post('/', upload.single('icon'), createFeature);  // POST create a feature with icon upload
router.get('/:id', getFeatureById);            // GET feature by ID
router.put('/:id', upload.single('icon'), updateFeature); // PUT update feature with icon upload
router.delete('/:id', deleteFeature);          // DELETE feature by ID

module.exports = router;
