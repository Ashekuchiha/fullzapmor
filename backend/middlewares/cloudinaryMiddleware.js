const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'others';

        // Determine folder based on route or other conditions
        if (req.baseUrl.includes('services-providers')) {
            folder = 'services_provider';
        } else if (req.baseUrl.includes('service-organization')) {
            folder = 'service organization';
        }else if (req.baseUrl.includes('services')) {
            folder = 'services';
        }else if(req.baseUrl.includes('appusers')){
            folder = 'appUsersProfile'
        }

        return {
            folder: folder, // Set Cloudinary folder
            format: 'jpeg', // Automatically format to jpeg, optional
            public_id: `${Date.now()}_${file.originalname.split('.')[0]}`, // Unique name
        };
    },
});

// Set up Multer with Cloudinary storage
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png|webp|gif/;
        const extname = allowedFileTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

module.exports = upload;
