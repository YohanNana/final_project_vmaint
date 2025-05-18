import express from 'express';
import { createPrediction, getPredictionsByUser } from '../controllers/predictionController.js';
const router = express.Router();
router.post('/', createPrediction);
router.get('/user/:email', getPredictionsByUser);
export default router;
