const Horse = require('../models/Horse');

exports.createHorse = async (req, res) => {
  try {
    const { name, breed, age, medicalDocuments } = req.body;
    const newHorse = new Horse({
      owner: req.user.id, // Assuming you have the user's ID from the auth middleware
      name,
      breed,
      age,
      medicalDocuments
    });

    await newHorse.save();
    res.status(201).json(newHorse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update a horse
exports.updateHorse = async (req, res) => {
  try {
    const horseUpdateData = { ...req.body };

    // If there's a file uploaded, add its path to the update data
    if (req.file) {
      horseUpdateData.medicalDocuments = req.file.path; // Or handle it as needed
    }

    const horse = await Horse.findByIdAndUpdate(req.params.horseId, horseUpdateData, { new: true });
    if (!horse) {
      return res.status(404).json({ message: 'Horse not found' });
    }

    res.json(horse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
  
// Delete a horse
exports.deleteHorse = async (req, res) => {
  try {
    const horse = await Horse.findByIdAndDelete(req.params.horseId);
    if (!horse) {
      return res.status(404).json({ message: 'Horse not found' });      }
      res.json({ message: 'Horse deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
};
// Implement other CRUD operations similarly
