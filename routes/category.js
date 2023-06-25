const express = require("express");

const{
    index,
    getCategories,
} = require("../controllers/category");
const router = express.Router();


router.get("/", index);

module.exports = router;
