const express = require("express");
const router = express.Router();
const {
  newProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  id,
  photo,
} = require("../controllers/productController");

/**
 *
 * ROUTES PRODUCT
 *
 */

// Post product
router.post("/createProduct", newProduct);

// GetAll product
router.get("/products", getProducts);

// GetOne product
router.get("/:id", getProduct);

// export image
router.get("/photo/:id", photo);

// Update product
router.put("/updateProduct/:id", updateProduct);

// delete product
router.delete("/deleteProduct/:id", deleteProduct);

router.param("id", id);

module.exports = router;
