const mongoose = require('mongoose');

const stableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  pricePerNight: Number,
  amenities: [String],
  // Add other fields as necessary
});

module.exports = mongoose.model('Stable', stableSchema);