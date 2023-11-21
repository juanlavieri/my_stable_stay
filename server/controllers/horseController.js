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

// Implement other CRUD operations similarly
