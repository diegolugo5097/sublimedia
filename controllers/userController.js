const User = require("../models/User");
const mongoose = require("mongoose");

exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user); 
  } catch (error) { 
    res.status(404).json({
      message: error.message,
    }); 
  }
};

exports.read = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).json(user);
};

exports.createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar el usuario");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user, _id },
    {
      new: true,
    }
  );
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar el usuario");

  await User.findByIdAndDelete(id);

  res.json({ message: "El usuario se ha sido eliminado" });
};