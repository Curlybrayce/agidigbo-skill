const express = require('express');
const router = express.Router();
const { 
  signup, 
  login,
  sendVerification,
  verfyEmail,
  getUserDetails,
} = require('../controllers/authController');

// const {updateProfilePicture} = require('../controllers/DPUploadController');

router.post('/register', signup);
router.post('/login', login);
router.post('/send-verification-code', sendVerification);
router.post('/verify-email', verfyEmail);
router.post('/get-user-details', getUserDetails);
// router.post('/update-dp', updateProfilePicture);

module.exports = router;