const axios = require('axios');

const geocode = async searchText => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json`;

  try {
    const {
      data: {
        features
      }
    } = await axios.get(url, {
      params: {
        'limit': 1,
        'access_token': 'pk.eyJ1IjoieXNrYWNoa292IiwiYSI6ImNrYXF3OXFlZjBkNmcycXFuYjdqdzBza2EifQ.VN6ext2-A_Y1wffPDhqwmQ'
      }
    });

    if (!features.length) {
      return {};
    }

    const [{ place_name: location, center: [longitude, latitude] }] = features;

    return {
      location,
      latitude,
      longitude
    };
  } catch (err) {
    // TODO: Add error handling
    console.log(err);

    return {};
  }
};

module.exports = geocode;
