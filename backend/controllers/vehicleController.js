import Vehicle from '../models/vehicleModel.js';

// Create a new vehicle
// controllers/vehicleController.js
export const createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;
    const newVehicle = new Vehicle(vehicleData);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate vehicle entry (plate or VIN already exists)' });
    } else {
      res.status(500).json({ message: 'Error creating vehicle', error: error.message });
    }
  }
};



// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get vehicles by owner email
export const getVehiclesByOwnerEmail = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ ownerEmail: req.params.email });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all vehicles (optional)
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
