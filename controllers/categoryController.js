const Category = require("../models/Category");
const mongoose = require("mongoose");

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  const category = req.body;
  const newcategory = new Category(category);
  try {
    await newcategory.save();
    res.status(201).json(newcategory);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { id: _id } = req.params;
  const category = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar la categoria");

  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    { ...category, _id },
    {
      new: true,
    }
  );
  res.json(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar la categoria");

  await Category.findByIdAndDelete(id);

  res.json({ message: "La categoria ha sido eliminado" });
};
