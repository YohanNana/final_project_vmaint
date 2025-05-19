import express from 'express';
import {
  // addMaintenance,
  // getAllByOwner,
  // getByVehicleId,
  deleteMaintenance,
  updateMaintenance,
  createMaintenanceRecord,
  getMaintenanceByUserEmail,
  getMaintenanceByVehicleId
} from '../controllers/maintenanceController.js';

const router = express.Router();

// router.post('/', addMaintenance);
// router.get('/owner/:email', getAllByOwner);

router.put('/:id', updateMaintenance);
router.delete('/:id', deleteMaintenance);

// ✅ And this one too (for adding records)
router.post('/', createMaintenanceRecord);

// ✅ This must be defined
router.get('/user/:email', getMaintenanceByUserEmail);
router.get('/vehicle/:vehicleId', getMaintenanceByVehicleId);


export default router;
