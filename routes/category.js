const categoryController = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

/**
 *
 * ROUTES CATEGORY
 *
 */

// Post Category
router.post("/createCategory", categoryController.newCategory);

// GetAll Category
router.get("/categories", categoryController.getCategories);

// GetOne Category
router.get("/:id", categoryController.getCategory);

// Update category
router.put("/updateCategory/:id", categoryController.updateCategory);

// delete category
router.delete("/deleteCategory/:id", categoryController.deleteCategory);

module.exports = router;
