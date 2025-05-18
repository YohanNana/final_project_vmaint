import express from 'express';
import { getUserReport } from '../controllers/reportController.js';

const router = express.Router();
router.get('/user/:email', getUserReport);

export default router;
