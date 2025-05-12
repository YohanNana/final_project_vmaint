import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  vin: { type: String, required: true },
  status: { type: String, default: 'active' },
  ownerEmail: { type: String, required: true },
  maintenanceSummary: {
    currentMileage: Number,
    lastOilChange: Number,
    nextOilChangeIn: Number,
    lastTireRotation: Number,
    nextTireRotationIn: Number
  },
  recentMaintenance: [
    {
      date: String,
      serviceType: String,
      mileage: Number,
      cost: Number,
      notes: String
    }
  ]
}, {
  timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
