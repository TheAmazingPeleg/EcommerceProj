const productService = require("../services/product.js");
const categoryService = require("../services/category");
const userService = require("../services/user");

const userCheck = async (req, res) => {
    if(req.session.userId)
      return await userService.getUserById(req.session.userId);
    return newItem = {
      id: '',
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
    const user = await userCheck(req, res);
    res.render("../views/profile.ejs", { products, categories, user });
};

const getOrders = async (req, res) => {
    // try {
    //     const admins = await adminService.getAdmins();
    //     res.status(201).send(admins);
    // } catch (error) {
    //     res.status(400).send(error);
    // }
};

const updateUser = async (req, res) => {
    try {
        if(req.body.firstName.length < 2){
            throw 'The first name must contain atleast 2 letters';
        }
        if(req.body.lastName.length < 2){
            throw 'The last name must contain atleast 2 letters';
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
            res.status(400).send(error);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    index,
    getOrders,
    updateUser
};