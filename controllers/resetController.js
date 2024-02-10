const createError = require('http-errors');
const { authEmail } = require('../auth/auth_Email');
const bcrypt = require('bcrypt');
const { sendPasswordResetEmail } = require('../config/emailSender');
const { sequelize, registers: Register } = require('../models/indexStart');


exports.resetPassword = async (req, res, next) => {
  try {

    const { email, newPassword } = req.body;
    console.log('Received request body:', req.body);
    console.log('Received email:', email);
    console.log('Received password:', newPassword);

    if (!email) {
      throw createError.BadRequest('Email is required.');
    }

    // // Validate email using Joi
    const { error, value: validatedData } = authEmail.validate({ email });
    if (error) {
      throw createError.BadRequest(error.message);
    }

    // Find the user with the provided reset token
    const user = await Register.findOne({ where: { email: validatedData.email } });
      // Find the user with the provided email
     
    console.log('User found:', user);

    if (!user) {
      // Handle case when user is not found
      throw createError.BadRequest('User not found.');
    }

    

    const resetLink = user.email;
    console.log('Generated reset link:', resetLink);


    // Send a password reset email with the reset link
    await sendPasswordResetEmail(user.email, resetLink);


    // Update the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(newPassword, salt);
    
    await user.update({
      password: hashedPwd,

    });

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

