const categoryModel = require("../models/category");
const index = async (req, res) => { 
    const categories = await categoryModel.getCategories();
    res.render("../views/category", {categories});
};

module.exports = {
    index
};