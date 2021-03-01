const express = require("express");
const router = express.Router();
const {
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getEmployes,
  read,
} = require("../controllers/employeController");

/** 
 *
 * ROUTES EMPLOYEE
 * 
 */

// Post employee
router.post("/create", createEmploye);

// GetAll employees
router.get("/employes", getEmployes);

// Update employee
router.patch("/update/:id", updateEmploye);

// delete employee
router.delete("/delete/:id", deleteEmploye);

// read employee
router.get("/read/:id", read);

module.exports = router;
