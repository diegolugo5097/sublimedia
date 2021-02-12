const Category = require("../models/Category");

// Create new Category
exports.newCategory = async (req, res, next) => {
  // create object Category
  const category = new Category(req.body);

  try {
    await category.save();
    res.json({ message: "La categoria se agregó" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get one category
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Update category
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "La categoria fue eliminada" });
  } catch (error) {
    console.log(error);
    next();
  }
};
