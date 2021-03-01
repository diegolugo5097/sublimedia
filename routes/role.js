const express = require("express");
const router = express.Router();
const {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
  read,
} = require("../controllers/roleController");

/** 
 *
 * ROUTES ROLE
 *
 */

// Post role
router.post("/create", createRole);

// GetAll role
router.get("/roles", getRoles);

// Update role
router.patch("/update/:id", updateRole);

// delete role
router.delete("/delete/:id", deleteRole);

// read role
router.get("/read/:id", read);

module.exports = router;
