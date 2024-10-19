const express = require('express');
const router = express.Router();
const upload =require('../middlewares/uploadMiddleware')
const appUserController = require('../controllers/appuserController');

// Set up multer for file uploads (profile images)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage });

// Routes
router.post('/', upload.single('profile'), appUserController.createAppUser);
router.get('/', appUserController.getAppUsers);
router.get('/:id', appUserController.getAppUserById);
router.put('/:id', upload.single('profile'), appUserController.updateAppUser);

router.delete('/delete-multiple', appUserController.deleteMultipleAppUsers);

router.delete('/:id', appUserController.deleteAppUser);


module.exports = router;
