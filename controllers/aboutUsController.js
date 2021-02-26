const AboutUs = require("../models/AboutUs");
const mongoose = require("mongoose");

exports.getAboutUs = async (req, res) => {
  try {
    const abouts = await AboutUs.find();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.createAboutUs = async (req, res) => {
  const abouts = req.body;
  const newAboutUs = new AboutUs(abouts);
  try {
    await newAboutUs.save();
    res.status(201).json(newAboutUs);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateAboutUs = async (req, res) => {
  const { id: _id } = req.params;
  const abouts = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar");

  const updatedAboutUs = await AboutUs.findByIdAndUpdate(
    _id,
    { ...abouts, _id },
    {
      new: true,
    }
  );
  res.json(updatedAboutUs);
};

exports.deleteAboutUs = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar");

  await AboutUs.findByIdAndDelete(id);

  res.json({ message: "Ha sido eliminado" });
};
