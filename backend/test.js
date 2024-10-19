const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder in Cloudinary where images will be stored
    allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

// MongoDB model for saving image data
const ImageSchema = new mongoose.Schema({
  imageUrl: String,
  cloudinaryId: String,
});

const Image = mongoose.model('Image', ImageSchema);

const app = express();
app.use(express.json());

// MongoDB connection (replace with your own connection string)
mongoose.connect('mongodb://localhost:27017/imageUpload', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Save image data to MongoDB
    const image = new Image({
      imageUrl: req.file.path,
      cloudinaryId: req.file.filename,
    });
    await image.save();
    res.json({ message: 'Image uploaded successfully', image });
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
