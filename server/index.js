const express = require("express");
const bodyParser = require("body-parser");
const { init } = require("./db");
const routes = require("./routes");

//app.use(cors());

const PORT = 8000;

const app = express();
app.use(bodyParser.json());

// allow client application sent get and post requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});
app.use(routes);

// error handler
app.use(function(err, req, res, next) {
  return res.status(err.status || 500).json({ message: err.message });
});

// start the application only after connection to the database
init().then(() => {
  console.log("starting server on port " + PORT);
  app.listen(PORT);
});

module.exports = app;
