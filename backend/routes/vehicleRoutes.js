// routes/vehicleRoutes.js
import express from 'express';
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  getVehiclesByOwnerEmail
} from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/', createVehicle);
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById); // should NOT be `/vehicles/:id`
router.get('/owner/:email', getVehiclesByOwnerEmail);

export default router;
