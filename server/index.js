const express = require('express');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const stableRoutes = require('./routes/stableRoutes'); // Import stable routes

const app = express();
const port = 3001;

connectDB(); // Connect to MongoDB

app.use(express.json()); // For parsing JSON request bodies

app.use('/api/users', userRoutes);
app.use('/api/stables', stableRoutes); // Use stable routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
