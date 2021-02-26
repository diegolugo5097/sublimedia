const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: 60,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trime: true,
      require: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
