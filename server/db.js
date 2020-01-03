const mongoose = require("mongoose");

const connectionUrl = "mongodb://localhost:27017";
const dbName = "bankDB";

const init = async () => {
  // Create the database connection
  mongoose.connect(`${connectionUrl}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on("connected", function() {
    console.log("Connection to DB successful");
  });

  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose connection error: " + err);
  });
};

module.exports = { init };
