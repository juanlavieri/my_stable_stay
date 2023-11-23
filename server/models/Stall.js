const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
  stable: { type: mongoose.Schema.Types.ObjectId, ref: 'Stable', required: true },
  dimensions: { type: String, required: true },
  arrivalReady: { type: Boolean, default: false },
  price: { type: Number }, // Optional, if prices vary by stall
  description: { type: String, default: '' }
});

module.exports = mongoose.model('Stall', stallSchema);
