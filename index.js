const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

// Create server
const app = express();

// connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/sublimedia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable routing
app.use("/", routes());

// port and start server
app.listen(4000, () => {
  console.log("Funcionando correctamente");
});
