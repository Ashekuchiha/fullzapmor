const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/citiesController');

// Get all cities
router.get('/', citiesController.getAllCities);

// Get a city by ID
router.get('/:id', citiesController.getCityById);

// Create a new city
router.post('/', citiesController.createCity);

// Update a city by ID
router.put('/:id', citiesController.updateCity);

// Delete a city by ID
router.delete('/delete-multiple',citiesController.deleteMultipleCitys);
router.delete('/:id', citiesController.deleteCity);

module.exports = router;
