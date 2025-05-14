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
  ownerEmail: {
    type: String,
    required: true
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
