// controllers/notificationController.js
import Notification from '../models/notificationModel.js';

/**
 * GET /api/notifications/user/:email
 * List all notifications for a user.
 */
export const getNotificationsByUser = async (req, res) => {
  try {
    const email = req.params.email;
    const notes = await Notification.find({ ownerEmail: email }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * PUT /api/notifications/:email/mark-all-read
 * Mark all of a user’s notifications as read.
 */
export const markRead = async (req, res) => {
  try {
    const { email } = req.params;
    await Notification.updateMany(
      { ownerEmail: email, read: false },
      { read: true }
    );
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * DELETE /api/notifications/:email/clear-all
 * Delete all notifications for a user.
 */
export const clearAll = async (req, res) => {
  try {
    const { email } = req.params;
    await Notification.deleteMany({ ownerEmail: email });
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
