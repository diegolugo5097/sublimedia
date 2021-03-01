const Employe = require("../models/Employe");
const mongoose = require("mongoose");

exports.getEmployes = async (req, res) => {
  try {
    const employe = await Employe.find();
    res.status(200).json(employe);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  } 
};

exports.read = async (req, res) => {
  const employe = await Employe.findById(req.params.id);
  return res.status(200).json(employe);
};

exports.createEmploye = async (req, res) => {
  const employe = req.body;
  const newEmploye = new Employe(employe);
  try {
    await newEmploye.save();
    res.status(201).json(newEmploye);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateEmploye = async (req, res) => {
  const { id: _id } = req.params;
  const employe = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar el empleado");

  const updatedEmploye = await Employe.findByIdAndUpdate(
    _id,
    { ...employe, _id },
    {
      new: true,
    }
  );
  res.json(updatedEmploye);
};

exports.deleteEmploye = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar el empleado");

  await Employe.findByIdAndDelete(id);

  res.json({ message: "El empleado ha sido eliminado" });
};
