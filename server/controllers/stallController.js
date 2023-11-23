const Stall = require('../models/Stall');
const Stable = require('../models/Stable');

exports.createStall = async (req, res) => {
  try {
    const { stableId, dimensions, arrivalReady, price, description } = req.body;

    const stable = await Stable.findById(stableId);
    if (!stable) {
      return res.status(404).json({ message: 'Stable not found' });
    }

    const newStall = new Stall({
      stable: stableId,
      dimensions,
      arrivalReady,
      price,
      description
    });

    await newStall.save();

    // Add stall to stable's stall array
    stable.stalls.push(newStall);
    await stable.save();

    res.status(201).json(newStall);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getStall = async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.stallId);
    if (!stall) {
      return res.status(404).json({ message: 'Stall not found' });
    }
    res.json(stall);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.updateStall = async (req, res) => {
  try {
    const stall = await Stall.findByIdAndUpdate(req.params.stallId, req.body, { new: true });
    if (!stall) {
      return res.status(404).json({ message: 'Stall not found' });
    }
    res.json(stall);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteStall = async (req, res) => {
  try {
    const stall = await Stall.findByIdAndDelete(req.params.stallId);
    if (!stall) {
      return res.status(404).json({ message: 'Stall not found' });
    }

    // Remove stall reference from stable
    await Stable.findByIdAndUpdate(stall.stable, { $pull: { stalls: stall._id } });

    res.json({ message: 'Stall deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
