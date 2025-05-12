import express from 'express';
import {
  getUserByEmail,
  registerUser,
  loginUser,
  updateUserByEmail,
} from '../controllers/userController.js';

const router = express.Router();

// ✅ Route changes here
router.post('/register', registerUser);
router.post('/login', loginUser);

// 🔁 Change this to match frontend call to /users/email/:email
router.get('/email/:email', getUserByEmail);

router.put('/user/:email', updateUserByEmail);

export default router;
