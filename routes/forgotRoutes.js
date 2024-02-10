const express = require('express');
const routes = express.Router();
const forgotController = require('../controllers/forgotController');

// ... other routes

// Route for handling forgot password request - for sennding email to the gmail account - Linked to the FORGOTPASSWORD COMPONENT
routes.post('/forgot-password', forgotController.forgotPassword);

module.exports = routes;


