const User = require("../models/User");

// Create a new User
exports.newUser = async (req, res, next) => {
  // create object User
  const user = new User(req.body);

  try {
    await user.save();
    res.json({ message: "El agregó un nuevo usuario" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Get one user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "el usuario fue eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
