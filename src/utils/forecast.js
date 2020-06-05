const axios = require('axios');

const forecast = async (latitude, longitude) => {
  const url = 'http://api.weatherstack.com/current';

  try {
    const {
      data: {
        current: {
          temperature,
          humidity,
          weather_descriptions: weatherDescriptions,
          wind_speed: windSpeed,
          observation_time: observationTime
        }
      }
    } = await axios.get(url, {
      params: {
        'access_key': 'faf23e68427125134387b79ec1ac053b',
        'query': `${latitude},${longitude}`,
      }
    });

    return `
    ${weatherDescriptions[0]}.
    It's currently ${temperature} degrees out.
    
    The wind speed is ${windSpeed} and the humidity is ${humidity}%.
    
    Observation time: ${observationTime}.`;
  } catch (err) {
    // TODO: Add error handling
    console.log(err);

    return '';
  }
};

module.exports = forecast;
