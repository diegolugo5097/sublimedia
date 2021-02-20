const express = require("express");
const router = express.Router();

const {
  newAboutUs,
  getAboutUs,
  updateAbout,
  deleteAboutUs,
} = require("../controllers/aboutUsController");

router.post("/createAbout", newAboutUs);
router.get("/about", getAboutUs);
router.put("/updateAbout/:id", updateAbout);
router.delete("/deleteAboutUs/:id", deleteAboutUs);

module.exports = router;
