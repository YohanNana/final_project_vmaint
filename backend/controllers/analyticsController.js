import Maintenance from '../models/maintenanceModel.js';
import Prediction from '../models/predictionModel.js';
import Vehicle from '../models/vehicleModel.js';

export const getAnalytics = async (req, res) => {
  try {
    const { email, vehicleId } = req.query;

    // 1. Filter vehicles owned by user
    const vehicleFilter = { ownerEmail: email };
    if (vehicleId) vehicleFilter._id = vehicleId;

    const vehicles = await Vehicle.find(vehicleFilter);
    const vehicleIds = vehicles.map(v => v._id);

    // 2. Get maintenance records
    const maints = await Maintenance.find({ vehicleId: { $in: vehicleIds } });

    // 3. Get predictions
    const preds = await Prediction.find({ vehicleId: { $in: vehicleIds } });

    res.json({ vehicles, maints, preds });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
