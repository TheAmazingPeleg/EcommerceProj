const productService = require("../services/product.js");
const categoryService = require("../services/category");
const userService = require("../services/user");
const orderService = require("../services/order");
const bcrypt = require("bcryptjs");

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

const index = async (req, res) => {
    const products = await productService.getProducts();
    const categories = await categoryService.getCategories();
    const user = await userCheck(req.session.userId);
    res.render("../views/profile.ejs", { products, categories, user, sessionId: req.session.userId });
};

const changePasswordForm = async (req, res) => {
    const products = await productService.getProducts();
    const categories = await categoryService.getCategories();
    const user = await userCheck(req.session.userId);
    res.render("../views/password.ejs", { products, categories, user, sessionId: req.session.userId });
};

const changePassword = async (req, res) => {
    const userPassCheck = await userService.getUserById(req.session.userId);
    const isMatch = await bcrypt.compare(req.body.oldPassword, userPassCheck.password);
    if(!isMatch){
        return res.status(404).json({ errors: ['The old password is wrong'] });
    }
    if(req.body.password.length < 6){
        return res.status(404).json({ errors: ['The password must contain atleast 6 letters'] });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await userService.updateUser(req.session.userId, {password});
    if(user)
        res.status(200).send(user);
    else
        res.status(400).send(error);
};


const getOrders = async (req, res) => {
    const orders = await orderService.getOrdersByUserId(req.session.userId);
    const categories = await categoryService.getCategories();
    const user = await userCheck(req.session.userId);
    res.render("../views/myOrders.ejs", { orders, categories, user, sessionId: req.session.userId });
};

const updateUser = async (req, res) => {
    if(req.body.firstName.length < 2){
        return res.status(404).json({ errors: ['The first name must contain atleast 2 letters'] });
    }
    if(req.body.lastName.length < 2){
        return res.status(404).json({ errors: ['The last name must contain atleast 2 letters'] });
    }
    const user = await userService.updateUser(req.session.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        zip: req.body.zip
    });
    if(user)
        res.status(200).send(user);
    else
        res.status(404).send(error);
}

module.exports = {
    index,
    getOrders,
    updateUser,
    changePassword,
    changePasswordForm
};