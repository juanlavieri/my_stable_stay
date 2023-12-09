'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  websiteUrl: String,
  phoneNumber: String,
  email: String,
  amenities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Amenity',
    },
  ],
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  averageRating: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stalls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stall',
    },
  ],
});

module.exports = mongoose.model('Stable', StableSchema);
