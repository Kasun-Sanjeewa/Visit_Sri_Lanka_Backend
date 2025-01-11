const axios = require('axios');

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const GOOGLE_API_KEY = 'AIzaSyCUSyENHBa0q85_ksDRqtX2DkkC2QMMYII'; // Replace with your actual key

// Function to fetch place details from Google Places API
async function fetchPlaceDetails(location) {
    const url = `${GOOGLE_PLACES_API_URL}?input=${location}&inputtype=textquery&fields=name,place_id,photos&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);

    return response.data; // Return the raw response data
}

module.exports = {
    fetchPlaceDetails,
};
