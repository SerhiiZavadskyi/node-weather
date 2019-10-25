const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a417ca046018817c91177b48e145c32b/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weeather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      const {daily, currently } = response.body
      callback(undefined, `${daily.data[0].summary} It is currently ${currently.temperature} degress out. There is a ${currently.precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;
