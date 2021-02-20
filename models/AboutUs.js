const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutUsShema = new Schema(
  {
    description: {
      type: String,
      require: true,
      maxlength: 5000,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", aboutUsShema);
