const AboutUs = require("../models/AboutUs");
const { errorHandler } = require("../helpers/dberrorHandler");

exports.newAboutUs = async (req, res, next) => {
  try {
    const aboutUs = new AboutUs(req.body);
    await aboutUs.save((err, data) => {
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

// Get all about us
exports.getAboutUs = async (req, res, next) => {
  try {
    await AboutUs.find().exec((err, data) => {
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

// Update about us
exports.updateAbout = async (req, res, next) => {
  try {
    await AboutUs.findOneAndUpdate({ _id: req.params.id }, req.body, {
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

// Delete about us
exports.deleteAboutUs = async (req, res, next) => {
  try {
    await AboutUs.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
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
