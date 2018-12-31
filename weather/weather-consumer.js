const Weather = require('./src/index');

const weather = new Weather();
weather.getWeatherByCity('sydney').then(result => {
  console.log(result);
})
