const express = require('express');
const routes = express.Router();
const resetController = require('../controllers/resetController');


// Route for handling forgot password request - directing the user to the PasswordReset.js file
routes.post('/password-reset', resetController.resetPassword);

module.exports = routes;


