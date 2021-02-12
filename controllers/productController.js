const Product = require("../models/Product");

// Create new Product
exports.newProduct = async (req, res, next) => {
  // create object Product
  const product = new Product(req.body);

  try {
    await product.save();
    res.json({ message: "El producto se agregó" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get all products
exports.getproducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get one Product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "El producto fue eliminada" });
  } catch (error) {
    console.log(error);
    next();
  }
};
