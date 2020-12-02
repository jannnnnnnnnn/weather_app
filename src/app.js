const path = require("path");
const express = require("express");
const hbs = require("hbs");
const fetchGeoData = require("./utils/fetchGeoData");
const fetchWeatherData = require("./utils/fetchWeatherData");

const app = express();

//----Define paths for Express confid
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//----Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//-----Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "me",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "me",
    message: "this page has some instructions.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Need an address" });
  }
  fetchGeoData(req.query.address, (error, geodata) => {
    if (error) {
      return res.send({ error });
    }
    fetchWeatherData(geodata, (error, weatherdata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        forecast: weatherdata,
        location: geodata.location,
      });
    });
  });
});

//catch all help pages
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "me",
    errorMessage: "Help Article not found",
  });
});

//capture all the other pages
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "me",
    errorMessage: "Page not found",
  });
});

//listen method on port 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
