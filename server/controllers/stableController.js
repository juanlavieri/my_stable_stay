const Stable = require('../models/Stable');

exports.createStable = async (req, res) => {
  try {
    const newStable = new Stable(req.body);
    await newStable.save();
    res.status(201).json(newStable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Implement other CRUD operations (read, update, delete)
