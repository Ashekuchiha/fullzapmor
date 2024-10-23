const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

// Get all states
router.get('/', stateController.getAllStates);
router.get('/all',stateController.getAllStatesAll);
// Get state by ID
router.get('/:id', stateController.getStateById);

// Create a new state
router.post('/', stateController.createState);

// Update a state
router.put('/:id', stateController.updateState);

// Delete a state
router.delete('/delete-multiple',stateController.deleteMultipleStates);
router.delete('/:id', stateController.deleteState);

module.exports = router;
