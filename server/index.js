require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const stableRoutes = require('./routes/stableRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const horseRoutes = require('./routes/horseRoutes');
const cors = require('cors');

const app = express();
const port = 3001;

connectDB(); // Connect to MongoDB

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend's URL
}));

app.use(express.json()); // For parsing JSON request bodies

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// File upload route
app.post('/api/upload', upload.array('pictures', 5), (req, res) => {
  // Process and respond here
  res.send('Files uploaded successfully.');
});

// Other routes
app.use('/api/users', userRoutes);
app.use('/api/stables', stableRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/horses', horseRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
