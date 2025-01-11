const express = require('express');
const { getLocationDetails } = require('../controllers/locationController');

const router = express.Router();

// Define the route for fetching location details
router.get('/place', getLocationDetails);

module.exports = router;
