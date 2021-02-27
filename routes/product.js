const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  read,
  readProductCategory,
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

// read product for category
router.get("/read/productByCategory/:id", readProductCategory);

module.exports = router;
