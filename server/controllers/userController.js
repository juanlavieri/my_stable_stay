const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, roles = ['user'] } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      roles: ['user','stableOwner']
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', roles: user.roles });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

    if (!user.roles || user.roles.length === 0) {
      user.roles = ['user', 'stableOwner'];
      await user.save();
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // Get user ID from the JWT token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.name, email: user.email, roles: user.roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from request, adjust based on your auth setup
    const { name, email } = req.body; // Extract fields from request body

    // Update user in database, this is just an example, adjust according to your database schema
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



