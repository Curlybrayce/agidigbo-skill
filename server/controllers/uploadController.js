const User = require('../models/UserModel');
const multer = require('multer');


const { cloudinary, validateAccount } = require('../config/cloudinaryConfig');

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
}).single('image');

// Configure cloudinary

exports.updateProfilePicture = async (req, res) => {
  try {
    // Use multer to process the upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ 
          success: false, 
          message: 'File upload error', 
          error: err.message 
        });
      }

      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: 'No file provided' 
        });
      }

      const { user, act } = req.body;

      if (!user) {
        return res.status(400).json({ 
          success: false, 
          message: 'User email is required' 
        });
      }

      try {
        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: `reministr/${act === 'dp' ? 'profile_pictures' : 'cover_photos'}`,
          resource_type: 'auto',
        });

        // Update user profile picture in database
        const updatedUser = await User.findOneAndUpdate(
          { email: user },
          { 
            [`${act}_url`]: uploadResponse.secure_url,
            updatedAt: new Date()
          },
          { new: true }
        );
        

        if (!updatedUser) {
          return res.status(404).json({ 
            success: false, 
            message: 'User not found' 
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Profile picture updated successfully',
          data: {
            url: uploadResponse.secure_url,
            user: updatedUser
          }
        });

      } catch (error) {
        console.error('Upload/Update error:', error);
        return res.status(500).json({ 
          success: false, 
          message: 'Error updating profile picture',
          error: error.message 
        });
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};