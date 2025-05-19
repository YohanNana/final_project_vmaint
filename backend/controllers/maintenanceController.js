// controllers/maintenanceController.js
import Maintenance  from '../models/maintenanceModel.js';
import Vehicle      from '../models/vehicleModel.js';      // ➕ to read nextServiceDue & plate
import Notification from '../models/notificationModel.js'; // ➕ for upcoming reminders

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

  if (!vehicleId || !serviceType || !serviceDate || !ownerEmail) {
    return res
      .status(400)
      .json({ message: 'Missing required fields: vehicleId, serviceType, serviceDate, ownerEmail' });
  }

  try {
    // ————————————————
    // ① Save the maintenance record
    const record = await new Maintenance({
      vehicleId,
      serviceType,
      serviceDate,
      mileage,
      cost,
      notes,
      ownerEmail
    }).save();

    // ② Load vehicle to check upcoming due date
    const vehicle = await Vehicle.findById(vehicleId);

    // ③ If nextServiceDue is within 7 days, send reminder
    const now     = new Date();
    const nextDue = new Date(vehicle.nextServiceDue);
    const daysUntil = Math.ceil((nextDue - now) / (1000 * 60 * 60 * 24));

    if (daysUntil > 0 && daysUntil <= 7) {
      await new Notification({
        ownerEmail: ownerEmail,
        title:   '🔧 Upcoming Service Reminder',
        message: `Your ${vehicle.make} ${vehicle.model} (${vehicle.plate}) is due for service in ${daysUntil} day${daysUntil > 1 ? 's' : ''}.`
      }).save();
    }
    // ————————————————

    return res.status(201).json(record);
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


export const updateMaintenance = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
