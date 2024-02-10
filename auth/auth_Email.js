const Joi = require('joi');

const authEmail = Joi.object({
    email: Joi.string().email().required().lowercase(),

});

module.exports = { authEmail };





