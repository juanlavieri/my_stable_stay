const Stable = require('../models/Stable');
const Stall = require('../models/Stall');

exports.createStable = async (req, res) => {
  try {
    const { name, location, description, pricePerNight, amenities, paddocks, groomAvailable, ownerQuartersAvailable, pictures } = req.body;

    const newStable = new Stable({
      owner: req.user.id, // Assuming the user ID is attached to the request
      name,
      location,
      description,
      pricePerNight,
      amenities,
      paddocks,
      groomAvailable,
      ownerQuartersAvailable,
      pictures
    });

    await newStable.save();
    res.status(201).json(newStable);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getStable = async (req, res) => {
  try {
    const stable = await Stable.findById(req.params.stableId).populate('stalls');
    if (!stable) {
      return res.status(404).json({ message: 'Stable not found' });
    }
    res.json(stable);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.updateStable = async (req, res) => {
  try {
    const stable = await Stable.findByIdAndUpdate(req.params.stableId, req.body, { new: true });
    if (!stable) {
      return res.status(404).json({ message: 'Stable not found' });
    }
    res.json(stable);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteStable = async (req, res) => {
  try {
    const stable = await Stable.findByIdAndDelete(req.params.stableId);
    if (!stable) {
      return res.status(404).json({ message: 'Stable not found' });
    }
    res.json({ message: 'Stable deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
