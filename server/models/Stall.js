'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StallSchema = new Schema({
  name: String,
  description: String,
  size: String,
  available: Boolean,
  amenities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Amenity',
    },
  ],
  stable: {
    type: Schema.Types.ObjectId,
    ref: 'Stable',
    required: true,
  },
});

module.exports = mongoose.model('Stall', StallSchema);
