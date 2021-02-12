const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const userAdminController = require('../controllers/userAdminController');

module.exports = function () {
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
  router.get("/category/:id", categoryController.getCategory);

  // Update category
  router.put("/updateCategory/:id", categoryController.updateCategory);

  // delete category
  router.delete("/deleteCategory/:id", categoryController.deleteCategory);

  /**
   *
   * ROUTES USER
   *
   */

  // Post user
  router.post("/createUsers", userController.newUser);

  // GetAll user
  router.get("/users", userController.getUsers);

  // GetOne user
  router.get("/user/:id", userController.getUser);

  // Update user
  router.put("/updateUser/:id", userController.updateUser);

  // delete user
  router.delete("/deleteUser/:id", userController.deleteUser);

  /**
   *
   * ROUTES PRODUCT
   *
   */

  // Post product
  router.post("/createProducts", productController.newProduct);

  // GetAll product
  router.get("/Products", productController.getProducts);

  // GetOne product
  router.get("/Product/:id", productController.getProduct);

  // Update product
  router.put("/updateProduct/:id", productController.updateProduct);

  // delete product
  router.delete("/deleteProduct/:id", productController.deleteProduct);

  return router;
};
