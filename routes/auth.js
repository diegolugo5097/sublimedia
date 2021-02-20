const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  getUsers,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/users", getUsers);

module.exports = router;
