const express = require('express');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const stableRoutes = require('./routes/stableRoutes'); // Make sure this is correct

const app = express();
const port = 3001;

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/stables', stableRoutes); // Ensure this line is correct

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
