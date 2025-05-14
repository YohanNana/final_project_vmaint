
import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  serviceType: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  mileage: { type: Number },
  cost: { type: Number },
  notes: { type: String },
  ownerEmail: { type: String, required: true }
});

export default mongoose.model('Maintenance', maintenanceSchema);
