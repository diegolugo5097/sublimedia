const Service = require("../models/Service");
const mongoose = require("mongoose");

exports.getServices = async (req, res) => {
  try {
    const service = await Service.find();
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    }); 
  }
};

exports.read = async (req, res) => {
  const service = await Service.findById(req.params.id);
  return res.status(200).json(service);
};

exports.createService = async (req, res) => {
  const service = req.body;
  const newService = new Service(service);
  try {
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.updateService = async (req, res) => {
  const { id: _id } = req.params;
  const service = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Hubó un problema al actualizar el servicio");

  const updatedService = await Service.findByIdAndUpdate(
    _id,
    { ...service, _id },
    {
      new: true,
    }
  );
  res.json(updatedService);
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Hubó un problema al eliminar el servicio");

  await Service.findByIdAndDelete(id);

  res.json({ message: "El servicio se ha sido eliminado" });
};