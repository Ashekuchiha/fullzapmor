
const express = require('express');
const dotenv = require('dotenv');
const {connectDB,mongoConnectionStatus } = require('./config/db');
const cors = require('cors'); // Import cors

const userRoutes = require('./routes/userRoutes');
const featureTableRoutes = require('./routes/featureTableRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const appUserRoutes = require('./routes/appuserRoutes');
const commissionSetupRoutes = require('./routes/commissionSetupRoutes');
const serviceLocationRoutes = require('./routes/serviceLocationRoutes');
const stateRoutes = require('./routes/stateRoutes')
const citiesRoutes = require('./routes/citiesRoutes')
const serviceOrganizationRoutes = require('./routes/serviceOrganizationRoutes')

const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Use CORS middleware to allow all origins
app.use(cors());  // <--- Add this

// Connect to MongoDB
connectDB()

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define API routes
app.get('/', (req, res) => {
  res.send(`<h1>${mongoConnectionStatus}</h1>`);
});
app.use('/api/users', userRoutes);
app.use('/api/features', featureTableRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/services-providers', serviceProviderRoutes);
app.use('/api/appusers', appUserRoutes);
app.use('/api/commission-setups', commissionSetupRoutes);
app.use('/api/service-locations', serviceLocationRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/service-organization',serviceOrganizationRoutes );

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
