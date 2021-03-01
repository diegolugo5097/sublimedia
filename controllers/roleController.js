const Role = require("../models/Role");
const mongoose = require("mongoose");

exports.getRoles = async (req, res) => {
  try {
    const role = await Role.find();
    res.status(200).json(role);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    }); 
  }
};

exports.read = async (req, res) => {
  const role = await Role.findById(req.params.id);
  return res.status(200).json(role);
};

exports.createRole = async (req, res) => {
  const role = req.body;
  const newRole = new Role(role);
  try {
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateRole = async (req, res) => {
  const { id: _id } = req.params;
  const role = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar el role");

  const updatedRole = await Role.findByIdAndUpdate(
    _id,
    { ...role, _id },
    {
      new: true,
    }
  );
  res.json(updatedRole);
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar el role");

  await Role.findByIdAndDelete(id);

  res.json({ message: "El role se ha sido eliminado" });
};