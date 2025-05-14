import express from 'express';
import {
  // addMaintenance,
  // getAllByOwner,
  // getByVehicleId,
  // deleteMaintenance,
  // updateMaintenance,
  getMaintenanceByUserEmail,
  createMaintenanceRecord,
} from '../controllers/maintenanceController.js';

const router = express.Router();

// router.post('/', addMaintenance);
// router.get('/owner/:email', getAllByOwner);
// router.get('/vehicle/:vehicleId', getByVehicleId);
// router.put('/:id', updateMaintenance);
// router.delete('/:id', deleteMaintenance);

// ✅ This must be defined
router.get('/user/:email', getMaintenanceByUserEmail);

// ✅ And this one too (for adding records)
router.post('/', createMaintenanceRecord);

export default router;
