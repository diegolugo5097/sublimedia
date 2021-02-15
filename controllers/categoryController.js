const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dberrorHandler");

// Create new Category
exports.newCategory = async (req, res, next) => {
  // create object Category
  try {
    const category = new Category(req.body);
    await category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ message: "Se creó satisfactoriamente" });
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    await Category.find().exec((err, data) => {
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

// Get one category
exports.getCategory = async (req, res, next) => {
  try {
    await Category.findById(req.params.id).exec((err, data) => {
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

// Update category
exports.updateCategory = async (req, res, next) => {
  try {
    await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ message: "Se actualizó satisfactoriamente " });
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findOneAndDelete({ _id: req.params.id }).exec(
      (err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({ message: "Se eliminó satisfactoriamente" });
      }
    );
  } catch (error) {
    console.log(error);
    next();
  }
};
