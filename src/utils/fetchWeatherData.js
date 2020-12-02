require("dotenv").config();
const fetch = require("node-fetch");
const fetchCheckStatus = require("./fetchCheckStatus");

async function fetchWeatherData({ latitude, longtitude } = {}, callback) {
  const weatherURL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${latitude},${longtitude}`;
  try {
    const res = await fetch(weatherURL);
    const finalRes = await fetchCheckStatus(res);
    if (finalRes.error) {
      callback(finalRes.error, undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = finalRes.current;
      const sentence = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
      callback(undefined, sentence);
    }
  } catch (err) {
    callback(err, undefined);
  }
}

module.exports = fetchWeatherData;
