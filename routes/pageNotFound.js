const express = require("express");
const productService = require("../services/product.js");
const categoryService = require("../services/category");
const userService = require("../services/user");

const userCheck = async (id) => {
    if(id !== undefined)
      return await userService.getUserById(id);
    return newItem = {
      _id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      country: '',
      city: '',
      zip: ''
    };
  }

const router = express.Router();

router.get("*", async (req, res) => {
    const products = await productService.getProducts();
    const categories = await categoryService.getCategories();
    const user = await userCheck(req.session.userId);
    res.render("../views/404/404.ejs", { products, categories, user });
});


module.exports = router;