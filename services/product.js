const mongoose = require("mongoose");
const Product = require("../models/product");

const createProduct = async (name, description, categories, images, priceBeforeDiscount, price, amount, sizes, colors, sex) => {
  const product = new Product({
    name,
    description,
    categories,
    images,
    priceBeforeDiscount,
    price,
    amount,
    sizes,
    colors,
    sex
  });

  return await product.save();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const getProductsByCategoryName = async (name) => {
    const products = Product.find({
        categories: name
    });
    return products;
};

const getProducts = async (page, searchOptions = {}) => {
  if (page) {
    const pageSize = process.env.AMOUNT_OF_PRODUCTS_PER_RESPONSE || 4;
    return await Product.find(searchOptions)
      .sort({ _id: 1 })
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * pageSize);
  }

  return await Product.find({}).sort({ _id: 1 });
};


const updateProduct = async (id,
    name,
    description,
    categories,
    images,
    priceBeforeDiscout,
    price,
    amount,
    sizes,
    colors,
    sex
    ) => {
    Product.updateOne({_id: id}, {
        name: name,
        description: description,
        categories: categories,
        images: images,
        priceBeforeDiscout: priceBeforeDiscout,
        price: price,
        amount: amount,
        sizes: sizes,
        colors: colors,
        sex: sex
        },
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });
  return Product.findById({_id: id});
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) return null;

  await product.remove();
  return product;
};

module.exports = {
    createProduct,
    getProductById,
    getProductsByCategoryName,
    getProducts,
    updateProduct,
    deleteProduct
};