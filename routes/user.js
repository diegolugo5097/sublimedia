const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  read,
} = require("../controllers/userController");

/** 
 *
 * ROUTES USER
 *
 */

// Post user
router.post("/create", createUser);

// GetAll user
router.get("/users", getUsers);

// Update user
router.patch("/update/:id", updateUser);

// delete user
router.delete("/delete/:id", deleteUser);

// read user
router.get("/read/:id", read);

module.exports = router;
