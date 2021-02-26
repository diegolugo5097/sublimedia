const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  read,
} = require("../controllers/productController");

/**
 *
 * ROUTES PRODUCT
 *
 */

// Post product
router.post("/create", createProduct);

// GetAll product
router.get("/products", getProducts);

// Update product
router.patch("/update/:id", updateProduct);

// delete product
router.delete("/delete/:id", deleteProduct);

// read product
router.get("/read/:id", read);

module.exports = router;
