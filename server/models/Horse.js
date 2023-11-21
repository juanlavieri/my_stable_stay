const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  breed: String,
  age: Number,
  medicalDocuments: [{
    title: String,
    documentUrl: String
  }]
});

module.exports = mongoose.model('Horse', horseSchema);
