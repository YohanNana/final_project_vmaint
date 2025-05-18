// models/notificationModel.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  ownerEmail: { type: String, required: true },
  title:      { type: String, required: true },
  message:    { type: String, required: true },
  read:       { type: Boolean, default: false },
  createdAt:  { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);
