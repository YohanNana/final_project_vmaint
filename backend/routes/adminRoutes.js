import express from 'express';
import { getAllUsers, getAllVehicles, deleteUser, banUser, getAdminStats } from '../controllers/adminController.js';
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/vehicles', getAllVehicles);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/ban', banUser);
router.get('/stats', getAdminStats);

export default router;
