//This file holds the email and password validation npm package.
//Remember to import the auth_Schema.js file into the registerModels.js file.
// The following package is sufficient for email, password and telephone validation.

const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required(),
});

module.exports = { authSchema };