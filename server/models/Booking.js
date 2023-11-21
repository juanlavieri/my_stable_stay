const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stable', // Replace with your Stable model name if different
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  // Add other fields as necessary
});

module.exports = mongoose.model('Booking', bookingSchema);
