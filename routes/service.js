const express = require("express");
const router = express.Router();
const {
  createService,
  updateService,
  deleteService,
  getServices,
  read,
} = require("../controllers/serviceController");

/** 
 *
 * ROUTES SERVICE
 *
 */

// Post service
router.post("/create", createService);

// GetAll service
router.get("/services", getServices);

// Update service
router.patch("/update/:id", updateService);

// delete service
router.delete("/delete/:id", deleteService);

// read service
router.get("/read/:id", read);

module.exports = router;
