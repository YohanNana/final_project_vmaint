const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  licensePlate: String,
  vin: String,
  status: String,
  ownerEmail: { type: String, required: true }, // ✅ Ensure this is present
  maintenanceSummary: {
    currentMileage: Number,
    lastOilChange: Number,
    nextOilChangeIn: Number,
    lastTireRotation: Number,
    nextTireRotationIn: Number,
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
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
