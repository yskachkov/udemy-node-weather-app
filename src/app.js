const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'John Skywalker'
  });
});

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About',
    author: 'John Skywalker'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'John Skywalker',
    text: 'Lorem ipsum'
  });
});

app.get('/weather', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    res.send({
      error: 'You must provide an address'
    });
    return;
  }

  const { location, latitude, longitude } = await geocode(address);
  const hasLocationWithCoordinates = location && latitude && longitude;

  if (!hasLocationWithCoordinates) {
    res.send({
      error: 'Location coordinates not found'
    });
    return;
  }

  const forecastInformation = await forecast(latitude, longitude);

  res.send({
    location,
    address,
    forecast: forecastInformation
  });
});

app.get('/help/*', (req, res) => {
  res.render('not-found', {
    title: 'Not found',
    author: 'John Skywalker',
    message: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('not-found', {
    title: 'Not found',
    author: 'John Skywalker',
    message: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
