// controllers/maintenanceController.js
import Maintenance from '../models/maintenanceModel.js';

/**
 * POST /api/maintenance
 * Creates a new maintenance record.
 */
export const createMaintenanceRecord = async (req, res) => {
  console.log('👉 Incoming maintenance payload:', req.body);

  const {
    vehicleId,
    serviceType,
    serviceDate,
    mileage,
    cost,
    notes,
    ownerEmail
  } = req.body;

  // Validate required
  if (!vehicleId || !serviceType || !serviceDate || !ownerEmail) {
    return res
      .status(400)
      .json({ message: 'Missing required fields: vehicleId, serviceType, serviceDate, ownerEmail' });
  }

  try {
    const record = new Maintenance({
      vehicleId,
      serviceType,
      serviceDate,
      mileage,
      cost,
      notes,
      ownerEmail
    });
    const saved = await record.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Failed to create maintenance record:', error);
    return res.status(500).json({ message: 'Failed to create record', error: error.message });
  }
};

/**
 * GET /api/maintenance/user/:email
 * Returns all maintenance records for a given user (by ownerEmail).
 */
export const getMaintenanceByUserEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const records = await Maintenance.find({ ownerEmail: email })
      .populate('vehicleId')
      .sort({ serviceDate: -1 });
    return res.status(200).json(records);
  } catch (error) {
    console.error('❌ Failed to fetch maintenance by user:', error);
    return res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
};

/**
 * GET /api/maintenance/vehicle/:vehicleId
 * Returns all maintenance records for a single vehicle.
 */
export const getMaintenanceByVehicleId = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    const records = await Maintenance.find({ vehicleId }).sort({ serviceDate: -1 });
    return res.status(200).json(records);
  } catch (error) {
    console.error('❌ Failed to fetch maintenance by vehicle:', error);
    return res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
};



// export const getAllByOwner = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const records = await Maintenance.find({ ownerEmail: email }).populate('vehicleId');
//     res.json(records);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch maintenance history', error: error.message });
//   }
// };

// export const getByVehicleId = async (req, res) => {
//   try {
//     const { vehicleId } = req.params;
//     const records = await Maintenance.find({ vehicleId }).sort({ dueDate: 1 });
//     res.json(records);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch maintenance', error: error.message });
//   }
// };

// export const deleteMaintenance = async (req, res) => {
//   try {
//     await Maintenance.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Delete failed', error: error.message });
//   }
// };

// export const updateMaintenance = async (req, res) => {
//   try {
//     const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: 'Update failed', error: error.message });
//   }
// };

