import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, model: 'Toyota Prius' }, 
    { id: 2, model: 'Honda Civic' }, 
    { id: 3, model: 'Ford Focus' }, 
    { id: 4, model: 'Chevrolet Bolt' }
]);
});

export default router;
