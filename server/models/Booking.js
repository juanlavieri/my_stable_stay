'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberOfHorses: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stable: {
    type: Schema.Types.ObjectId,
    ref: 'Stable',
    required: true,
  },
  stalls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stall',
    },
  ],
});

module.exports = mongoose.model('Booking', BookingSchema);
