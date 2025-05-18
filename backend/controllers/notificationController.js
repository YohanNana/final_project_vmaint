// controllers/notificationController.js
import Notification from '../models/notificationModel.js';

export const createNotification = async (req, res) => {
  try {
    const note = new Notification(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ ownerEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ ownerEmail: req.params.email }, { read: true });
    res.status(200).json({ message: "All marked as read." });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({ ownerEmail: req.params.email });
    res.status(200).json({ message: "All notifications cleared." });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
