const express = require("express");

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};


const router = express.Router();

router.get("/", logout);


module.exports = router;