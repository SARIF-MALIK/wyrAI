const express = require('express');
const router = express.Router();
const { getStoredOTPFromDatabase, updateOTPInDatabase, isOTPValid } = require('./yourDatabaseFunctions');

router.post('/verifyotp', async (req, res) => {
  const { email, enteredOTP } = req.body;

  try {

    const { otp: storedOTP, timestamp: storedTimestamp } = await getStoredOTPFromDatabase(email);

    if (enteredOTP === storedOTP) {
      const currentTime = Date.now();
      const timeDifference = currentTime - storedTimestamp;
      const timeValidityInSeconds = 60;

      if (timeDifference <= timeValidityInSeconds * 1000) {
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
      } else {
        // OTP has expired
        res.status(400).json({ success: false, message: 'OTP has expired' });
      }
    } else {
      // Incorrect OTP
      res.status(400).json({ success: false, message: 'Incorrect OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
