require('dotenv').config();

const express = require('express');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const stableRoutes = require('./routes/stableRoutes'); // Import stable routes
const bookingRoutes = require('./routes/bookingRoutes');
const horseRoutes = require('./routes/horseRoutes');


const app = express();
const port = 3001;

connectDB(); // Connect to MongoDB

app.use(express.json()); // For parsing JSON request bodies

app.use('/api/users', userRoutes);
app.use('/api/stables', stableRoutes); // Use stable routes
// Use bookingRoutes with a prefix
app.use('/api/bookings', bookingRoutes);
app.use('/api/horses', horseRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
