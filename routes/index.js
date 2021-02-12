const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController');

module.exports = function () {
  // Post Category
  router.post("/createCategory", categoryController.newCategory);

  // GetAll Category
  router.get("/categories", categoryController.getCategories);

  // GetOne Category
  router.get('/category/:id', categoryController.getCategory);

  // Update category
  router.put('/updateCategory/:id', categoryController.updateCategory);

  // delete category
  router.delete('/deleteCategory/:id', categoryController.deleteCategory);

  return router;
};
