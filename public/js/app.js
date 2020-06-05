const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');

const firstMessage = document.getElementById('first-message');
const secondMessage = document.getElementById('second-message');

const fetchWeather = async location => {
  firstMessage.textContent = 'Loading...';
  secondMessage.textContent = '';

  const response = await fetch(`/weather?address=${location}`);
  const {
    location: weatherLocation,
    // address: weatherAddress,
    forecast: weatherForecast,
    error
  } = await response.json();

  if (error) {
    firstMessage.textContent = error;
    return;
  }

  firstMessage.textContent = weatherLocation;
  secondMessage.textContent = weatherForecast;
};

weatherForm.addEventListener('submit', event => {
  event.preventDefault();

  const { value: location } = searchField;

  if (!location) {
    return;
  }

  fetchWeather(location);
});
