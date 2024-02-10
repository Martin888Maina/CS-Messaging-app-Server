//Importing express
const express = require('express');

//Importing contactRoutes file
const routes  = express.Router();

//Importing the contactController file
const messageController = require('../controllers/messageController');

//Importing the verify accessToken into the contactRoutes.js file
// const { verifyAccessToken } = require('../helpers/jwtHelper'); // jwtHelpers is imported into the contact route since we are using accesstoken

//Route to save/send data to the database.
routes.post('/addMessage',  messageController.addMessage);

// Route to retrieve all contacts.
routes.get('/message',  messageController.getMessages);

//Route to retrieve a single contact by ID
routes.get('/messageId/:id',  messageController.getMessage);

//Route to Update a record in the database.
routes.patch('/updateMessage/:id',  messageController.updateMessage);

//Route to delete a record from the database.
routes.delete('/deleteMessage/:id',   messageController.deleteMessage);

module.exports = routes;

