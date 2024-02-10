const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerController');

// for user registration
routes.post('/register', registerController.register);

// Get all users
routes.get('/users', registerController.getAllUsers);

//Route to retrieve a single user by ID
routes.get('/userId/:id', registerController.getOneUser);

// Update user role
routes.patch('/updateUsers/:id', registerController.updateUserRole);

// Delete user
routes.delete('/deleteUsers/:id', registerController.deleteUser);

// for user registration
routes.post('/login', registerController.login);

// to refresh the access tokens using the refresh token
routes.post('/refresh-token', registerController.refreshToken);

module.exports = routes;
