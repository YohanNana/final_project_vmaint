import Prediction from '../models/predictionModel.js';
import Vehicle from '../models/vehicleModel.js';

export const getUserReport = async (req, res) => {
  try {
    const { email } = req.params;
    const { vehicleId, startDate, endDate } = req.query;

    if (!email) return res.status(400).json({ message: 'Email required' });

    let query = { ownerEmail: email };
    if (vehicleId) query.vehicleId = vehicleId;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const results = await Prediction.find(query).populate('vehicleId').sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
