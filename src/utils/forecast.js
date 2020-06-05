const axios = require('axios');

const forecast = async (latitude, longitude) => {
  const url = 'http://api.weatherstack.com/current';

  try {
    const {
      data: {
        current: {
          temperature,
          feelslike,
          weather_descriptions: weatherDescriptions
        }
      }
    } = await axios.get(url, {
      params: {
        'access_key': 'faf23e68427125134387b79ec1ac053b',
        'query': `${latitude},${longitude}`,
        // 'units': 'f'
      }
    });

    return `${weatherDescriptions[0]}. It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out`;
  } catch (err) {
    // TODO: Add error handling
    console.log(err);

    return '';
  }
};

module.exports = forecast;
