const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectiryPath = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectiryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Wheather app',
    name: 'Serge Zavadskyi'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, dataForecast) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
      location,
        address: req.query.address,
        forecast: dataForecast
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  res.send({
    products: []
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Serge Zavadskyi'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: 'Help information',
    name: 'Serge Zavadskyi'
  });
});

app.get('/help/*', (req, res) => [
  res.render('404', {
    errorMassege: 'Help article not found',
    title: 'Error',
    name: 'Serge Zavadskyi'
  })
]);

app.get('*', (req, res) => {
  res.render('404', {
    errorMassege: 'My 404 page',
    title: 'Error',
    name: 'Serge Zavadskyi'
  });
});

app.listen(3001, () => {
  console.log('server is up on port 3001');
});
