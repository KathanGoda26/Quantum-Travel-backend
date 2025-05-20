import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import tourRoute from "./routes/tour.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://quantum-travel-bice.vercel.app",
  "https://quantum-travel-admin.vercel.app",
];

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Mongo database connected");
  } catch (error) {
    console.error("❌ Mongo database connection failed:", error.message);
  }
};

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// ✅ Root route for basic deployment test
app.get("/", (req, res) => {
  res.send("🌐 Quantum Travel Backend is Running");
});

// ✅ Optional: Health-check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

// Routes
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/admin", adminRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/v1/upload", uploadRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error Stack:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const startServer = async () => {
  await connect();
  app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
  });
};

startServer();
