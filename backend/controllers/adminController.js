import User from '../models/User.js';
import Vehicle from '../models/vehicleModel.js';
import Maintenance from '../models/maintenanceModel.js';
import Prediction from '../models/predictionModel.js';


export const getAdminStats = async (req, res) => {
  try {
    const [userCount, vehicleCount, maintenanceCount, predictionCount] = await Promise.all([
      User.countDocuments(),
      Vehicle.countDocuments(),
      Maintenance.countDocuments(),
      Prediction.countDocuments()
    ]);

    res.json({
      users: userCount,
      vehicles: vehicleCount,
      maintenances: maintenanceCount,
      predictions: predictionCount
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch stats', error: e.message });
  }
};


// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');       // omit password
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET /api/admin/vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('ownerEmail');
    res.json(vehicles);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// PUT /api/admin/users/:id/ban
export const banUser = async (req, res) => {
  try {
    // Let’s assume you’ve added an “isBanned” flag to User schema
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: true },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
