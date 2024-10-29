const multer = require('multer');
const path = require('path');

// Set storage engine
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/icons/'); // Store files in uploads/icons
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = 'uploads/';

        // Check for specific path based on route or request type
        if (req.baseUrl.includes('services-providers')) {
            uploadPath += 'provider/';
        } else if (req.baseUrl.includes('user')) {
            uploadPath += 'users/';
        } else {
            uploadPath += 'others/'; // Default folder for other cases
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    }
});

// Filter files to allow only images
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Initialize multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Limit file size to 2MB
});

module.exports = upload;
