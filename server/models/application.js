const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    zone: {
      type: String,
      required: [true, "Zone is required"],
      trim: true,
    },
    stream: {
      type: String,
      required: [true, "Stream is required"],
      trim: true,
    },
    education: {
      type: String,
      // required: [true, "Education details are required"],
    },
    educationDoc: {
      type: String,
      // required: [true, "Education document is required"],
    },
    nationalID: {
      type: String,
      // required: [true, "National ID document is required"],
    },
    passportPhoto: {
      type: String,
      // required: [true, "Passport photo is required"],
    },
    experience: {
      type: String,
      // required: [true, "Experience details are required"],
    },
    expectations: {
      type: String,
      // required: [true, "Expectations are required"],
    },
    handwork: {
      type: String,
      required: [true, "Handwork field is required"],
    },
    computerAccess: {
      type: Boolean,
      default: false,
    },
    internetAccess: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    isRegistered: {
      type: Boolean,
      default: false, // Becomes true when the applicant completes registration
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
