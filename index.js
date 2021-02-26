const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// use methods libs.
const app = express();
require("dotenv").config();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// enable routing
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/about", require("./routes/aboutUs"));
app.use("/api", require("./routes/sendEmail"));

// port and start server
app.listen(process.env.PORT, () => {
  console.log("Run server successfully");
});

mongoose.set("useFindAndModify", false);
