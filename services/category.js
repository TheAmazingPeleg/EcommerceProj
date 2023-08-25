const mongoose = require("mongoose");
const Category = require("../models/category");

const createCategory = async (
  name,
  image,
  slogan
) => {
  const category = new Category({
    name,
    image,
    slogan
  });

  return await category.save();
};

const getCategoryById = async (id) => {
    return await Category.findById(id);
};

const getCategoryByName = async (name) => {
    return await Category.findOne( {name: name} );
};

const getCategories = async (searchOptions = {}) => {
  return await Category.find(searchOptions).sort({ _id: 1 });
};


const updateCategory = async (id,
    name,
    sloagn,
    image
    ) => {
    Product.updateOne({_id: id}, {
        name: name,
        slogan: slogan,
        image: image
        },
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });
  return Category.findById({_id: id});
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);
  if (!category) return null;

  await category.remove();
  return category;
};

module.exports = {
    createCategory,
    getCategoryById,
    getCategoryByName,
    getCategories,
    updateCategory,
    deleteCategory
};