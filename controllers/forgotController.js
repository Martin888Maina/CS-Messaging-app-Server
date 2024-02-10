// forgotController.js
const  db = require('../models/indexStart');
//Import the sequelize instance and Register model from indexStart.js
//The following code worked
const { sequelize, registers: Register } = require('../models/indexStart');
const { authEmail } = require('../auth/auth_Email');
const createError = require('http-errors');
const { sendPasswordResetEmail } = require('../config/emailSender');

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate email using Joi
    const { error, value: validatedData } = authEmail.validate({ email });
    if (error) {
      throw createError.BadRequest(error.message);
    }

    // Find the user with the provided email
    const user = await Register.findOne({ where: { email: validatedData.email } });

    if (!user) {
      // User not found
      throw createError.NotFound('User not found.');
    }

    // Send a password reset email
    await sendPasswordResetEmail(user.email);

    return res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    if (error.isJoi || error.status === 400) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error.' });
  }
};








