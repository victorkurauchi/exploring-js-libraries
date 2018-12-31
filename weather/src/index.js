require("@babel/polyfill");

const axios = require('axios');
const { groupBy } = require('lodash');

class Weather {
  constructor() {
    this.endpoint = 'https://www.metaweather.com/api';
  }

  groupByDates(weather) {
    return groupBy(weather, (item) => item.applicable_date);
  }

  async getCity(city) {
    const response = await axios.get(`${this.endpoint}/location/search/?query=${city}`);
    return response.data;
  }

  async getWeather(cityId) {
    const response = await axios.get(`${this.endpoint}/location/${cityId}`)
    return response.data;
  }

  async getWeatherByCity(city) {
    const information = await this.getCity(city);
    const { woeid } = information[0];
    const { consolidated_weather, sources } = await this.getWeather(woeid);;
    const dates = this.groupByDates(consolidated_weather);
    const result = {
      dates,
      sources,
    };
    
    return result;
  }
}

module.exports = Weather;
