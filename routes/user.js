const express = require("express");

const {
    index,
    getOrders,
    updateUser
} = require("../controllers/user");

const { requireUserLogin } = require("./modularLogin");

const router = express.Router();

router.get("/", requireUserLogin(), index)
router.route("/").post(updateUser);
router.get("/orders", requireUserLogin(), getOrders);


module.exports = router;