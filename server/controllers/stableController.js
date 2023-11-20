const Stable = require('../models/Stable');

// Create a new stable
exports.createStable = async (req, res) => {
  try {
    const newStable = new Stable(req.body);
    await newStable.save();
    res.status(201).json(newStable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all stables
exports.getAllStables = async (req, res) => {
  try {
    const stables = await Stable.find();
    res.status(200).json(stables);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single stable by ID
exports.getStableById = async (req, res) => {
  try {
    const stable = await Stable.findById(req.params.id);
    if (!stable) {
      return res.status(404).json({ message: "Stable not found" });
    }
    res.status(200).json(stable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a stable by ID
exports.updateStable = async (req, res) => {
  try {
    const updatedStable = await Stable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStable) {
      return res.status(404).json({ message: "Stable not found" });
    }
    res.status(200).json(updatedStable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a stable by ID
exports.deleteStable = async (req, res) => {
  try {
    const deletedStable = await Stable.findByIdAndDelete(req.params.id);
    if (!deletedStable) {
      return res.status(404).json({ message: "Stable not found" });
    }
    res.status(200).json({ message: "Stable deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
