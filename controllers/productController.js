const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.read = async (req, res) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json(product);
};

exports.createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar el producto");

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { ...product, _id },
    {
      new: true,
    }
  );
  res.json(updatedProduct);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar el producto");

  await Product.findByIdAndDelete(id);

  res.json({ message: "El producto ha sido eliminado" });
};
