const express = require("express");

const {
  index,
  product,
  category,
  createProduct,
  cart,
  getProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  createCategory,
  getCategories
} = require("../controllers/shop");

const router = express.Router();

router.route("/").get(index);
router.route("/cart").get(cart);
router.route("/api/products").get(getProducts).post(createProduct);
router.route("/api/categories").get(getCategories).post(createCategory);
router.route("/:category").get(category);
router.route("/:category/:product").get(product);
//router.route("api/products/:id").get(getProduct).delete(deleteProduct).put(updateProduct);
//router.route("api/categories/:id").get(getCategory).delete(deleteCategory).put(updateCategory);

module.exports = { router };