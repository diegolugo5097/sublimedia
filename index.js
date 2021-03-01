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
app.use(express.static("public"));

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
app.use("/api/service", require("./routes/service"));
app.use("/api/user", require("./routes/user"));
app.use("/api/employe", require("./routes/employe"));
app.use("/api", require("./routes/sendEmail"));
app.use("/api/role", require("./routes/role"));

app.use("/api", require("./routes/sendEmail"));

// port and start server
app.listen(process.env.PORT, () => {
  console.log("Run server successfully");
});

mongoose.set("useFindAndModify", false);
