const mongoose = require('mongoose');

const stableSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, default: '' },
  pricePerNight: { type: Number, required: true },
  amenities: [{ type: String }],
  stalls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stall' }],
  paddocks: { type: Number, default: 0 },
  groomAvailable: { type: Boolean, default: false },
  ownerQuartersAvailable: { type: Boolean, default: false },
  pictures: [{ type: String }] // Assuming URLs of images
});

module.exports = mongoose.model('Stable', stableSchema);
