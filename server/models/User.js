const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // existing fields...
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'stableOwner'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
