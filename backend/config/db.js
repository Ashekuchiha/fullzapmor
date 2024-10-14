const mongoose = require('mongoose');

let mongoConnectionStatus = 'MongoDB not connected'; // Default status message

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        mongoConnectionStatus = 'MongoDB connected successfully';
        console.log(mongoConnectionStatus);
    } catch (error) {
        mongoConnectionStatus = `MongoDB connection failed: ${error.message}`;
        console.error(mongoConnectionStatus);
        process.exit(1); // Exit the process with failure
    }
};

// Export both the connection function and status
module.exports = { connectDB, mongoConnectionStatus };
