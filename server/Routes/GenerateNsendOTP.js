const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Generate OTP
function generateAlphaNumericOTP(length) {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }
  return otp;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for security
    pass: process.env.EMAIL_PASSWORD, // Use environment variables for security
  },
});

router.post('/sendotp', (req, res) => {
  const { email } = req.body;
    console.log('reached at post req backend')
  // Generate OTP
  const otp = generateAlphaNumericOTP(4);

  // Email configuration
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is: ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'OTP sent successfully.' });
      
    }
  });
});

module.exports = router;
