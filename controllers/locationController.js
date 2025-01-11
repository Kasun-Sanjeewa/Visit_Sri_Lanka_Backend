const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getLocationDetails(req, res) {
    const location = req.query.location;

    if (!location) {
        return res.status(400).json({ error: 'Location parameter is required' });
    }

    try {
        // Construct the Google Places API URL
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=name,place_id,photos&key=${GOOGLE_API_KEY}`;

        // Fetch data from the Google Places API using axios
        const response = await axios.get(url);

        if (response.data.candidates && response.data.candidates[0].photos) {
            const candidate = response.data.candidates[0];
            const photoRef = candidate.photos[0].photo_reference;

            // Construct the photo URL using the photo reference
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;

            // Construct the Google Maps URL using the place_id
            const placeUrl = `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`;

            // Return the constructed URLs
            return res.json({
                locationUrl: placeUrl, // Google Maps URL
                photoUrl: photoUrl,    // Photo URL
            });
        } else {
            return res.status(404).json({ error: 'No photos found for this location' });
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        return res.status(500).json({ error: 'Error fetching location data' });
    }
}

module.exports = {
    getLocationDetails,
};
