// const mongoose = require('mongoose');

// let mongoConnectionStatus = 'MongoDB not connected'; // Default status message

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true
//         });
//         mongoConnectionStatus = 'MongoDB connected successfully';
//         console.log(mongoConnectionStatus);
//     } catch (error) {
//         mongoConnectionStatus = `MongoDB connection failed: ${error.message}`;
//         console.error(mongoConnectionStatus);
//         process.exit(1); // Exit the process with failure
//     }
// };

// // Export both the connection function and status
// module.exports = { connectDB, mongoConnectionStatus };

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = { connectDB, mongoConnectionStatus: isConnected ? 'MongoDB Connected' : 'MongoDB Not Connected' };
