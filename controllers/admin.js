const adminService = require("../services/admin");


const index = async (req, res) => {
    const admin = await adminService.getAdmin(req.session.adminId);
    res.render("../views/admin.ejs", { admin });
};

const createAdminsForm = (req, res) => {
    res.render("../views/admin-forms/create-admin-form.ejs");
};

const manageAdminsForm = (req, res) => {
    res.render("../views/admin-forms/manage-admins-form.ejs");
};

const createAdmin = async (req, res) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const admin = await adminService.deleteAdmin(req.params.id);
        res.status(201).send(admin);
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
        const admin = await adminService.updateAdmin(req.params.id, req.body);
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
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
    deleteAdmin
};