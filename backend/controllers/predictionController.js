import Prediction from '../models/predictionModel.js';

export const createPrediction = async (req, res) => {
  try {
    const { ownerEmail, vehicleId, inputData, maintenanceRequired, confidence } = req.body;
    if (!ownerEmail || !vehicleId || maintenanceRequired == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const p = await new Prediction({ ownerEmail, vehicleId, inputData, maintenanceRequired, confidence }).save();
    res.status(201).json(p);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getPredictionsByUser = async (req, res) => {
  try {
    const email = req.params.email;
    const preds = await Prediction.find({ ownerEmail: email }).populate('vehicleId').sort({ createdAt: -1 });
    res.json(preds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
