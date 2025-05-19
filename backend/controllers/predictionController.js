import Prediction from '../models/predictionModel.js';
import Vehicle    from '../models/vehicleModel.js';         // ➕ needed to look up make/model/plate
import Notification from '../models/notificationModel.js';  // ➕ your new Notification model

export const createPrediction = async (req, res) => {
  try {
    const { ownerEmail, vehicleId, inputData, maintenanceRequired, confidence } = req.body;
    if (!ownerEmail || !vehicleId || maintenanceRequired == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ————————————————
    // ① Save the prediction
    const prediction = await new Prediction({ ownerEmail, vehicleId, inputData, maintenanceRequired, confidence }).save();

    // ② Load the vehicle so we can mention make/model/plate
    const vehicle = await Vehicle.findById(vehicleId);

    // ➕ ③ If “yes”, save a Notification
    if (prediction.maintenanceRequired) {
      await new Notification({
        ownerEmail: ownerEmail,
        title:   '⚠️ Maintenance Required!',
        message: `Your ${vehicle.make} ${vehicle.model} (${vehicle.plate}) needs maintenance — Confidence: ${prediction.confidence ?? 'N/A'}%.`
      }).save();
    }
    // ————————————————

    res.status(201).json(prediction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getPredictionsByUser = async (req, res) => {
  try {
    const email = req.params.email;
    const preds = await Prediction
      .find({ ownerEmail: email })
      .populate('vehicleId')
      .sort({ createdAt: -1 });
    res.json(preds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
