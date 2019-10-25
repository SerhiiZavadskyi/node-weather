const request = require('request');

const geocode = (address, callback) =>{
    const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiemF2YWRza3lpIiwiYSI6ImNrMjBweW9kOTA0Y3czZHBndnNkaGllaDkifQ.PrplvDHpQMGDIeVRHq1SZQ&limit=1`;
  
  request({ url, json: true }, (err, response) => {
    if (err) {
      callback('Cant to connect to weeather app',undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to get location', undefined);
    } else {
      const [longitude, latitude] = response.body.features[0].center;
      callback(undefined, {longitude, latitude , location: response.body.features[0].place_name});
    }
  });
  
}

module.exports = geocode;
