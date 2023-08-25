const express = require("express");

const {
    index,
    getOrders,
    updateUser,
    changePasswordForm,
    changePassword
} = require("../controllers/user");

const { requireUserLogin } = require("./modularLogin");

const router = express.Router();

router.get("/", requireUserLogin(), index);
router.route("/").post(updateUser);
router.route("/password").get(requireUserLogin(), changePasswordForm).post(changePassword);
router.get("/orders", requireUserLogin(), getOrders);
router.get("*", requireUserLogin(), index);



module.exports = router;