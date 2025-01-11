const express = require('express');
const cors = require('cors');
require('dotenv').config();
const locationRoutes = require('./routes/locationRoutes');


const app = express();

// Middleware
app.use(cors());

// Routes
app.use('/api', locationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
