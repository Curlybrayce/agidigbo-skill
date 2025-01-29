const Applications = require("../models/application");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const EmailVerification = require("../models/EmailVerificationModel");
const multer = require("multer");
const fs = require("fs").promises;
const cloudinary = require("../config/cloudinaryConfig");



// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
}).fields([
  { name: "passportPhoto", maxCount: 1 },
  { name: "nationalID", maxCount: 1 },
  { name: "educationDoc", maxCount: 1 },
]);

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(file.buffer);
  });
};


// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const hashCode = (code) => {
  return crypto.createHash("sha256").update(code).digest("hex");
};

exports.sendVerification = async (req, res) => {
  const { email, phone, fullName } = req.body;
  if (!phone || !fullName || !email) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      verificationSent: false,
      message: "Invalid email format",
    });
  }

  try {
    const existingUser = await Applications.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(201).json({
        signupSucceed: false,
        message: "Application Exists",
      });
    }
    
    try {
      // Create Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Validate email configuration
      transporter.verify((error, success) => {
        if (error) {
          console.error("Email transporter error:", error);
        }
      });

      const verificationCode = generateVerificationCode();
      const hashedCode = hashCode(verificationCode);

      await EmailVerification.findOneAndUpdate(
        { email },
        { code: hashedCode, createdAt: new Date(), attempts: 0 },
        { upsert: true, new: true }
      );

      // Email configuration
      const mailOptions = {
        from: '"AgidigboFM" <verify@remistr.com>',
        to: email,
        subject: `${fullName}, confirm your email address to complete registration on AgidigboFM Job Learning Portal`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agidigbo FM Application Form Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #f4f4f4;
                    padding: 15px;
                    text-align: center;
                    border-bottom: 2px solid #e0e0e0;
                }
                .verification-details {
                    background-color: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    padding: 20px;
                    margin-top: 20px;
                }
                .verification-code {
                    background-color: #f9f9f9;
                    border: 1px dashed #007bff;
                    text-align: center;
                    padding: 15px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    margin: 15px 0;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Account Verification</h1>
            </div>
            
            <div class="verification-details">
                <p>Hello ${fullName},</p>
                
                <p>Thank you for applying. To complete your Application, please use the verification code below:</p>
                
                <div class="verification-code">
                    ${verificationCode}
                </div>
                
                <p>This code will expire in 30 minutes. If you did not request this verification, please contact our support team.</p>
                <small>If you didn't request this verification, please ignore this email.</small>
            </div>
            
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} AgidigboFM89.7. All rights reserved.</p>
            </div>
        </body>
        </html>
        `,
        replyTo: email,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({
        verificationSent: true,
        message: `Verification Code Sent to ${email}`,
        messageId: info.messageId,
      });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({
        message: "Failed to send Verification Code",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

exports.verfyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find verification record
    const verificationRecord = await EmailVerification.findOne({ email });

    if (!verificationRecord) {
      return res.status(400).json({
        verified: false,
        message: "No verification request found",
      });
    }

    // Check attempts
    if (verificationRecord.attempts >= 5) {
      await EmailVerification.deleteOne({ email });
      return res.status(400).json({
        verified: false,
        message: "Too many verification attempts. Please request a new code.",
      });
    }

    // Compare hashed codes
    const hashedInputCode = hashCode(verificationCode);
    const isCodeValid = hashedInputCode === verificationRecord.code;

    if (isCodeValid) {
      // Delete verification record after successful verification
      await EmailVerification.deleteOne({ email });

      res.status(200).json({
        verified: true,
        message: "Email verified successfully",
      });
    } else {
      // Increment attempts
      verificationRecord.attempts += 1;
      await verificationRecord.save();

      res.status(400).json({
        verified: false,
        message: "Invalid verification code",
      });
    }
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      verified: false,
      message: "Internal server error",
    });
  }
};

exports.signup = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        signupSucceed: false,
        message: "File upload error: " + err.message,
      });
    }

    try {
      // Destructure form data
      const {
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        state,
        zone,
        stream,
        education,
        experience,
        expectations,
        handwork,
        computerAccess,
        internetAccess,
      } = req.body;

      // Check if user already exists
      const existingUser = await Applications.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser) {
        return res.status(400).json({
          signupSucceed: false,
          message: "User with this email or phone number already exists",
        });
      }

      // Upload files to Cloudinary
      const passportPhotoUrl = await uploadToCloudinary(
        req.files?.passportPhoto?.[0]
      );
      const nationalIDUrl = await uploadToCloudinary(
        req.files?.nationalID?.[0]
      );
      const educationDocUrl = await uploadToCloudinary(
        req.files?.educationDoc?.[0]
      );

      // Create new applicant record
      const user = await Applications.create({
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        state,
        zone,
        stream,
        education,
        experience,
        expectations,
        handwork,
        computerAccess: computerAccess === "on",
        internetAccess: internetAccess === "on",
        passportPhoto: passportPhotoUrl,
        nationalID: nationalIDUrl,
        educationDoc: educationDocUrl,
        status: "Pending",
        isRegistered: true,
      });

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        signupSucceed: true,
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({
        message: "Server error during registration",
        error: error.message,
      });
    }
  });
};

// @desc    Authenticate user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Clean email input
    const cleanEmail = email.trim();

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanEmail }],
    });

    if (!user) {
      return res
        .status(201)
        .json({ isLoginSucced: false, message: "User not found" });
    }

    // Check password
    if (await user.matchPassword(password)) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
        isLoginSucced: true,
        message: "Login successd",
      });
    } else {
      res
        .status(201)
        .json({ isLoginSucced: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  const { currentUserEmail } = req.body;
  try {
    if (!currentUserEmail) {
      return res.status(400).json({ message: "You need to Login" });
    }

    const cleanEmail = currentUserEmail.trim();

    const user = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanEmail }],
    });

    if (!user) {
      return res
        .status(201)
        .json({ isAccountVerified: false, message: "User not found" });
    }

    res.status(200).json({
      ...user._doc,
      isAccountVerified: true,
      message: "User Account Found!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error While Checking Account",
      error: error.message,
    });
  }
};
