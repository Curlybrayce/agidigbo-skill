const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const applicationRoute = require("./routes/applicationRoutes");
const authRoute = require("./routes/authRoutes");
// const uploadRoute = require("./routes/uploadRoutes");

app.use("/api/auth", authRoute);
app.use("/api/application", applicationRoute);

const startTime = new Date();
app.get("/health", async (req, res) => {
  try {
    const healthData = {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date(),
      serviceStarted: startTime,
    };

    // Memory usage information (optional)
    healthData.memory = {
      used: process.memoryUsage().heapUsed / 1024 / 1024,
      total: process.memoryUsage().heapTotal / 1024 / 1024,
    };

    // If everything is OK, send 200
    res.status(200).json(healthData);
  } catch (error) {
    // If there's an error, send 500
    res.status(500).json({
      status: "unhealthy",
      error: error.message,
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
