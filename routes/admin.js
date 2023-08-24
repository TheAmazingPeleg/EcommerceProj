const express = require("express");

const {
    index,
    createAdminsForm,
    manageAdminsForm,
    createAdmin,
    deleteAdmin,
    updateAdmin,
    manageUsersForm,
    deleteUser,
    updateUser,
    changeUserPassword
} = require("../controllers/admin");

const { requireAdminLogin } = require("./modularLogin");

const router = express.Router();

router.get("/", requireAdminLogin('/admin'), index);

router.route("/createAdminForm")
    .get(requireAdminLogin('/admin'), createAdminsForm)
    .post(createAdmin);
router.route("/manageAdminsForm")
    .get(requireAdminLogin('/admin'), manageAdminsForm)
    .post(updateAdmin)
    .delete(deleteAdmin);
    router.route("/manageUsersForm")
    .get(requireAdminLogin('/admin'), manageUsersForm)
    .post(updateUser)
    .put(changeUserPassword)
    .delete(deleteUser);


module.exports = router;