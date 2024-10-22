// cloudinaryMiddleware.js
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder where files will be stored
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed file types
  },
});

// Multer middleware for handling file upload
const uploadc = multer({ storage: storage });

module.exports = uploadc;
