const express = require("express");

const {
    index,
    login
} = require("../controllers/login");

const {redirectIfAuthenticated} = require("./modularLogin")

const router = express.Router();

router.route("/").get(redirectIfAuthenticated, index).post(login);

module.exports = router;