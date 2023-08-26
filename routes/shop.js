const express = require("express");

const {
  index,
  product,
  category,
  createProduct,
  cart,
  getProducts,
  createCategory,
  getCategories,
  createOrder
} = require("../controllers/shop");

const router = express.Router();

router.route("/").get(index);
router.route("/cart").get(cart).post(createOrder);
router.route("/api/products").get(getProducts).post(createProduct);
router.route("/api/categories").get(getCategories).post(createCategory);
router.route("/:category").get(category);
router.route("/:category/:product").get(product);

module.exports = { router };