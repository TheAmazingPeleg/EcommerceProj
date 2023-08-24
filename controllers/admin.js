const adminService = require("../services/admin");
const productService = require("../services/product");
const categoryService = require("../services/category");
const orderService = require("../services/order");
const userService = require("../services/user");
const d3 = require('d3-node');
const bcrypt = require("bcryptjs");



const index = async (req, res) => {
    const admin = await adminService.getAdmin(req.session.adminId);
    const products = await productService.getProducts();
    const categories = await categoryService.getCategories();
    const orders = await orderService.getOrders();
    const users = await userService.getUsers();
    const admins = await adminService.getAdmins();
    const fiveWeeksSum = await orderService.aggregateLast5Weeks();
    res.render("../views/admin.ejs", { admin, products, categories, orders, users, admins, d3, fiveWeeksSum });
};

const createAdminsForm = async (req, res) => {
    const admin = await adminService.getAdmin(req.session.adminId);
    res.render("../views/admin-forms/create-admin-form.ejs", { admin });
};

const manageAdminsForm = async (req, res) => {
    const admin = await adminService.getAdmin(req.session.adminId);
    const admins = await adminService.getAdmins();
    res.render("../views/admin-forms/manage-admins-form.ejs", { admin, admins });
};

const manageUsersForm = async (req, res) => {
    const admin = await adminService.getAdmin(req.session.adminId);
    const users = await userService.getUsers();
    res.render("../views/admin-forms/manage-users-form.ejs", { admin, users });
};

const createAdmin = async (req, res) => {
    console.log(req.body.username + " " + req.body.image + " " + req.body.password);
    try {
        const admin = await adminService.createAdmin(req.body.username, req.body.image, req.body.password);
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const adminCheck = await adminService.getAdmin(req.body.id);
        if(adminCheck.username === "admin"){
            res.status(400).send('Cannot delete the first admin!');
        }else{
            const adminValidation = await adminService.getAdmin(req.session.adminId);
            if(adminValidation.username !== 'admin'){
                res.status(400).send('You dont have permission to remove admins!');
            }else{
                const admin = await adminService.deleteAdmin(req.body.id);
                res.status(201).send(admin);
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.body.id);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAdmin = async (req, res) => {
    try {
        const admin = await adminService.getAdmin(req.params.id);
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAdmins();
        res.status(201).send(admins);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateAdmin = async (req, res) => {
    try {
        const adminValidation = await adminService.getAdmin(req.session.adminId);
        if(adminValidation.username !== "admin")
            res.status(400).send("Cannot update This Admin!");
        else{
            const admin = await adminService.updateAdmin(req.body.id, req.body.password);
            res.status(200).send(admin);
        }
    } catch (error) {
        res.status(400).send("Cannot update This Admin!");
    }
}

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.body.id, {
        username: req.body.username,
        email: req.body.email,
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
        res.status(404).send("Cannot update This User!");
}

const changeUserPassword = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await userService.updateUser(req.body.id, {password});
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("Cannot update This Admin!");
    }
}

module.exports = {
    index,
    createAdminsForm,
    manageAdminsForm,
    createAdmin,
    getAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    updateUser,
    deleteUser,
    changeUserPassword,
    manageUsersForm
};