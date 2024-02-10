// emailSender.js

const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (recipientEmail, resetLink) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // configure your mail server here
    // For example, for Gmail, you might use the following settings
    service: 'gmail',
    auth: {
      user: 'martmain.k@gmail.com',
      pass: 'wqrd bfua oowx avbd',
    },
  });

  // Email content
  const mailOptions = {
    from: 'martmain.k@gmail.com',
    to: recipientEmail,
    subject: 'Nodemailer: Password Reset Request',
    // text: `Click the following link to reset your password: ${resetLink}`,
    text: `Click the following link to reset your password: http://localhost:3000/password-reset/reset?email=${resetLink}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
