import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // User routes
import vehicleRoutes from './routes/vehicleRoutes.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
connectDB(); // Connect to MongoDB

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes); // Vehicle routes
app.use('/api/auth', authRoutes); // Authentication routes


// Example route
app.get('/', (req, res) => {
  res.send('Vehicle-Maintenance Backend Running 🚗🔧');
});

// Connect MongoDB and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});