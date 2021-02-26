const express = require("express");
const router = express.Router();

const {
  createAboutUs,
  deleteAboutUs,
  getAboutUs,
  updateAboutUs,
} = require("../controllers/aboutUsController");

router.post("/create", createAboutUs);
router.get("/abouts", getAboutUs);
router.patch("/update/:id", updateAboutUs);
router.delete("/delete/:id", deleteAboutUs);

module.exports = router;
