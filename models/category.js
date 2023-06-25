const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        isRequired: true,
        unique: true,
    },
    desc: {
        type: String,
        isRequired: false
    },
    image: {
        type: String,
        isRequired: false
    },
});

const createCategory = async ({ name, desc, image }) => {
    const category = new Category({ name, desc, image });
    await category.save();
    return category;
};
  
const getCategory = async (name) => {
    const category = await Category.findOne({ name });
    return category;
};
  
const getCategories = async (options = {}) => {
    const category = await Category.find(options);
    return category;
};
  
const updateCategory = async (id, newCategory) => {
    const category = await Category.findByIdAndUpdate(id, newCategory, {
        new: true,
        runValidators: true,
    });
    return category;
}
  
const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    return category;
}

module.exports = {
    createCategory,
    getCategory,
    getCategories,
    deleteCategory,
    updateCategory,
};