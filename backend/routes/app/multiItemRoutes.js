const express = require('express');
const router = express.Router();
const multiItemController = require('../../controllers/app/multiItemController');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/multiItem');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define routes
router.post('/', upload.single('image'), multiItemController.createMultiItem);
router.get('/', multiItemController.getAllMultiItems);
router.get('/:id', multiItemController.getMultiItemById);
router.put('/:id', upload.single('image'), multiItemController.updateMultiItem);
router.delete('/:id', multiItemController.deleteMultiItem);

module.exports = router;
