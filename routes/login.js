const express = require("express");


const {
    index,
    signup,
    login,
    register
} = require("../controllers/login");

const {redirectIfAuthenticated} = require("./modularLogin")

const router = express.Router();

router.route("/").get(redirectIfAuthenticated, index).post(login);
router.route("/newUser").get(redirectIfAuthenticated, signup).post(register);

module.exports = router;