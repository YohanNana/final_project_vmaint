import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // User routes
import vehicleRoutes from './routes/vehicleRoutes.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js'; // Prediction routes
import reportRoutes from './routes/reportRoutes.js'; // Report routes
import analyticsRoutes from './routes/analyticsRoutes.js'; // Analytics routes

dotenv.config();

const app = express();
connectDB(); // Connect to MongoDB

// Middlewares
// app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes); // Vehicle routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/maintenance', maintenanceRoutes); // Maintenance routes
app.use('/api/predictions', predictionRoutes); // Prediction routes
app.use('/api/reports', reportRoutes); // Report routes
app.use('/api/analytics', analyticsRoutes); // Analytics routes

// Example route
app.get('/', (req, res) => {
  res.send('Vehicle-Maintenance Backend Running 🚗🔧');
});

// Connect MongoDB and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});