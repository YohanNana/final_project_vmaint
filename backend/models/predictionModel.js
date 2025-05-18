import mongoose from 'mongoose';
const predictionSchema = new mongoose.Schema({
  ownerEmail:   { type: String, required: true },
  vehicleId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  inputData:    { type: Object, required: true },
  maintenanceRequired: { type: Boolean, required: true },
  confidence:   { type: Number },           // if your ML service returns it
  createdAt:    { type: Date, default: Date.now }
});
export default mongoose.model('Prediction', predictionSchema);
