
const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/citiesController');

// Get all cities
router.get('/all', citiesController.getAllcitiesAll); // All cities, regardless of criteria
router.get('/', citiesController.getAllCities);       // General get all route

// Get cities by state name (specific filter by state name)
router.get('/state/:stateName', citiesController.getCitiesByStateName); 

// Get a city by ID (specific city by ID)
router.get('/:id', citiesController.getCityById);

// Create a new city
router.post('/', citiesController.createCity);

// Update a city by ID
router.put('/:id', citiesController.updateCity);

// Delete routes
router.delete('/delete-multiple', citiesController.deleteMultipleCitys); // Delete multiple cities
router.delete('/:id', citiesController.deleteCity);                      // Delete single city by ID

module.exports = router;
