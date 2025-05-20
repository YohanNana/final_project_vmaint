import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  phone:      { type: String },
  accountType:{ type: String, enum: ['Vehicle Owner', 'Mechanic', 'Admin'], default: 'Vehicle Owner' },
  createdAt:  { type: Date, default: Date.now },
  isBanned: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
