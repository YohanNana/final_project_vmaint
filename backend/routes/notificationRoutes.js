// routes/notificationRoutes.js
import express from 'express';
import {
  createNotification,
  getNotifications,
  markAllRead,
  clearAll
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification);
router.get('/:email', getNotifications);
router.put('/:email/mark-all-read', markAllRead);
router.delete('/:email/clear-all', clearAll);

export default router;
