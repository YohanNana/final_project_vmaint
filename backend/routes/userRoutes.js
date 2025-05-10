import express from 'express';
import { getUserByEmail, registerUser, loginUser  } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:email', getUserByEmail);


export default router;
