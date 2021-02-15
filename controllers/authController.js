const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const formidable = require("formidable");

// sign up
exports.signup = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Hubó un error al subir la imagen",
      });
    }
    const { name, username, email, role } = fields;
    let user = new User(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "La imagen debe ser menor de 1MB",
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          error: "Error",
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      });
    });
  });
};

// sign in / login
exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "El usuario con ese email no existe",
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "El correo/contraseña no coinciden",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiration date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};
