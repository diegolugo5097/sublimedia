const Product = require("../models/Product");
const { errorHandler } = require("../helpers/dberrorHandler");
const fs = require("fs");
const formidable = require("formidable");

// Create new product
exports.newProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Hubó un error al subir la imagen",
      });
    }
    const { name, description, price, category, quantity } = fields;
    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "La imagen debe ser menor de 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: { message: "Error al registrar el producto" },
        });
      }
      res.json({ message: "Se agregó satisfactoriamente" });
    });
  });
};

// Get all products
exports.getProducts = (req, res) => {
  console.log(req);
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  Product.find()
    .populate("category")
    .sort([[sortBy, order]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "El producto no se encontro",
        });
      }
      res.json(products);
    });
};

// exports.read = (req, res) => {
//   req.product.photo = undefined;
//   return res.json(req.product);
// };

// Get one product
exports.getProduct = async (req, res, next) => {
  try {
    await Product.findById(req.params.id).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ message: "Se actualizó satisfactoriamente" }, data);
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.id = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "product not found",
        });
      }
      req.product = product;
      next();
    });
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ message: "Se eliminó satisfactoriamente" });
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
