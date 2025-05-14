import Maintenance from '../models/maintenanceModel.js';

// export const addMaintenance = async (req, res) => {
//   try {
//     const newEntry = new Maintenance(req.body);
//     await newEntry.save();
//     res.status(201).json(newEntry);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add maintenance record', error: error.message });
//   }
// };

export const createMaintenanceRecord = async (req, res) => {
  try {
    const {
      vehicleId,
      serviceType,
      serviceDate,
      mileage,
      cost,
      notes,
      ownerEmail
    } = req.body;

    if (!vehicleId || !serviceType || !serviceDate || !ownerEmail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Failed to create maintenance record:', error.message);
    res.status(500).json({ message: 'Failed to create record', error: error.message });
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


export const getMaintenanceByUserEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const records = await Maintenance.find({ ownerEmail: email }).populate('vehicleId');
    res.status(200).json(records);
  } catch (error) {
    console.error('❌ Failed to get maintenance by user:', error.message);
    res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
};
