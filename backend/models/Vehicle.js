import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  plate: String,
  vin: String,
  color: String,
  engine: String,
  transmission: String,
  mileage: Number,
  purchaseDate: Date,
  lastServiceDate: Date,
  lastServiceType: String,
  nextServiceDue: Date,
  ownerEmail: { type: String, required: true }, // ✅ Important for owner linkage
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Vehicle', vehicleSchema);
