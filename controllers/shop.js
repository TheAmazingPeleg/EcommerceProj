const productService = require("../services/product.js");
const categoryService = require("../services/category");

const index = async (req, res) => {
  const products = await productService.getProducts();
  const categories = await categoryService.getCategories();
  res.render("../views/shop", { products, categories });
};

const category = async (req, res) => {
  const categories = await categoryService.getCategories();
  if(req.params.category){
    const category = await categoryService.getCategoryByName(req.params.category);
    if(category){
      const products = await productService.getProducts(1, {categories: category.name});
      res.render("../views/category", { products, categories, category });
    }else{
      res.render("../views/404/category", { categories })
    }
  }else{
    res.render("../views/404/category", { categories })
  }
};

const product = async (req, res) => {
  const categories = await categoryService.getCategories();
  const product = await productService.getProductById(req.params.product);
  const category = await categoryService.getCategoryByName(req.params.category);
  const products = await productService.getProductsByCategoryName(req.params.category);
  res.render("../views/product", { categories, product, category, products });
};

const createCategory = async (req, res) => {
  const { name,
    slogan,
    image
    } = req.body;
    if(name === '' || slogan === '' || image === '')
        return null;

  const newCategory = await categoryService.creatCategory(
    name,
    slogan,
    image
  );
  res.json(newCategory);
};

const getCategories = async (req, res) => {
  const category = await categoryService.getCategories();
  res.json(category);
};

const createProduct = async (req, res) => {
  const { name,
    description,
    categories,
    images,
    priceBeforeDiscout,
    price,
    amount,
    sizes,
    colors,
    sex } = req.body;
    if(name === '' || description === '' || sizes.length > 3 || images.length === 0 || images.length > 5 || Number(price) !== price || price < 0 || Number(priceBeforeDiscout) !== priceBeforeDiscout || priceBeforeDiscout > price || Number(amount) !== amount || amount < 0)
        return null;
    sizes.map((size) => {
        if(size !== 'S' && size !== 'M' && size !== 'L')
        return null;
    });
    colors.map((color) => {
        if(color.length !== 6)
        return null;
    });
    if(sex.length == 1){
        if(sex[0] != 'Male' && sex[0] != 'Female' && sex[0] != 'Unisex'){
            return null;
        }
    }else if(sex.length == 2){
        sex.map((gender) => {
            if(gender != 'Male' && gender != 'Female'){
                return null;
            }
        });
    }else{
        return null;
    }
    categories.map(async (category) => {
        const cat = await categoryService.getCategoryByName(category);
        if(!cat)
            return null;
    });

  const newProduct = await productService.createProduct(
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
  );
  res.json(newProduct);
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.json(product);
};

const deleteProduct = async (req, res) => {
    const product = await productService.deleteProduct(req.params.id);
    res.json(product);
};

const getProducts = async (req, res) => {
  const product = await productService.getProducts(req.query.pageNum);
  res.json(product);
};

const getProductsByCategoryName = async (req, res) => {
  const product = await movieService.getProductsByCategoryName(req.params.categories);
  res.json(product);
};

const updateProduct = async (req, res) => {
  const { name,
    description,
    categories,
    images,
    priceBeforeDiscout,
    price,
    amount,
    sizes,
    colors,
    sex } = req.body;
  const product = await movieService.updateProduct(
    req.params.id,
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
  );
  res.json(product);
};

module.exports = {
  index,
  category,
  product,
  getCategories,
  createCategory,
  createProduct,
  getProduct,
  deleteProduct,
  getProducts,
  getProductsByCategoryName,
  updateProduct
};