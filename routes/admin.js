const express = require("express");

const {
    index,
    createAdminsForm,
    manageAdminsForm,
} = require("../controllers/admin");

const { requireAdminLogin } = require("./modularLogin");
const { createAdmin, getAdmins, deleteAdmin } = require("../controllers/admin");

const router = express.Router();

router.get("/", requireAdminLogin('/admin'), index);

router.get("/createAdminForm", requireAdminLogin('/admin'), createAdminsForm);
router.get("/manageAdminsForm", requireAdminLogin('/admin'), manageAdminsForm);

router.route("/api").post(createAdmin).get(getAdmins);

router.route("/api/:id").delete(deleteAdmin);

module.exports = router;