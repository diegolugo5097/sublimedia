const {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

/**
 *
 * ROUTES CATEGORY
 *
 */

// Post Category
router.post("/create", createCategory);

// // GetAll Category
router.get("/categories", getCategories);

// // Update category
router.patch("/update/:id", updateCategory);

// // delete category
router.delete("/delete/:id", deleteCategory);

module.exports = router;
