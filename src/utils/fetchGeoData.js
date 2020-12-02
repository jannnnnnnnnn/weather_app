require("dotenv").config();
const fetch = require("node-fetch");
const fetchCheckStatus = require("./fetchCheckStatus");

async function fetchGeoData(address, callback) {
  const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_KEY}`;
  try {
    const res = await fetch(mapboxURL);
    const finalRes = await fetchCheckStatus(res);
    if (finalRes.message) {
      callback(finalRes.message, undefined);
    } else if (finalRes.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { center, place_name } = finalRes.features[0];
      callback(undefined, {
        latitude: center[1],
        longtitude: center[0],
        location: place_name,
      });
    }
  } catch (err) {
    callback("Unable to connect to fetch data", undefined);
    // console.log(err);
  }
}

module.exports = fetchGeoData;
