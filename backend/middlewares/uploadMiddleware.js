// middleware/uploadMiddleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// Cloudinary storage configuration for both images and files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'uploads'; // Default folder
    let resource_type = 'auto'; // Can handle all types of files (image, video, raw)

    // Optionally, you can organize uploads into different folders
    if (file.mimetype.startsWith('image/')) {
      folder = 'uploads/images';
    } else {
      folder = 'uploads/files';
    }

    return {
      folder: folder,
      resource_type: resource_type,
      allowed_formats: ['jpeg', 'png', 'jpg', 'pdf', 'doc', 'mp4'], // Allow images, docs, and videos
    };
  },
});

// Multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
