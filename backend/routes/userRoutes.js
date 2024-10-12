const express = require('express');
const { getUsers, createUser, getUserById } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.get('/', getUsers);          // GET all users
router.post('/', createUser);       // POST create a user
router.get('/:id', getUserById);    // GET user by ID

module.exports = router;
