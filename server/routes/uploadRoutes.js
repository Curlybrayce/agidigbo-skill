const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  uploadMedia,
  getEventMedia 
} = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

// Multer configuration for file upload
const upload = multer({ 
  dest: 'uploads/',
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Upload media to event (multiple files)
router.post('/:eventId', 
  // protect, 
  upload.array('media', 1000), 
  uploadMedia
);

// Get event media
router.get('/:eventId', getEventMedia);

module.exports = router;