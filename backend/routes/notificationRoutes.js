import express from 'express';
import {
  getNotificationsByUser,
  markRead,
  clearAll
} from '../controllers/notificationController.js';  // <-- now matches exports

const router = express.Router();

// fetch list
router.get('/:email', getNotificationsByUser);

// mark them read
router.put('/:email/mark-all-read', markRead);

// clear all
router.delete('/:email/clear-all', clearAll);

export default router;
