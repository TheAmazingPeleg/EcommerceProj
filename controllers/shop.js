const productService = require("../services/product.js");
const categoryService = require("../services/category");
const userService = require("../services/user");
const orderService = require("../services/order");

const userCheck = async (id) => {
  if(id !== undefined)
    return await userService.getUserById(id);
  return newItem = {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    city: '',
    zip: ''
  };
}

const index = async (req, res) => {
  const products = await productService.getProducts();
  const categories = await categoryService.getCategories();
  const user = await userCheck(req.session.userId);
  res.render("../views/shop", { products, categories, user, sessionId: req.session.userId });
};

const cart = async (req, res) => {
  const products = await productService.getProducts();
  const categories = await categoryService.getCategories();
  const user = await userCheck(req.session.userId);
  res.render("../views/cart", { products, categories, user, sessionId: req.session.userId });
};


const category = async (req, res) => {
  const categories = await categoryService.getCategories();
  const user = await userCheck(req.session.userId);
  if(req.params.category){
    const category = await categoryService.getCategoryByName(req.params.category);
    if(category){
      const products = await productService.getProducts(1, {categories: category.name});
      res.render("../views/category", { products, categories, category, user });
    }else{
      res.render("../views/404/category", { categories, user, sessionId: req.session.userId })
    }
  }else{
    res.render("../views/404/category", { categories, user })
  }
};

const product = async (req, res) => {
  const user = await userCheck(req.session.userId);
  const categories = await categoryService.getCategories();
  const product = await productService.getProductById(req.params.product);
  console.log(product);
  const category = await categoryService.getCategoryByName(req.params.category);
  const products = await productService.getProductsByCategoryName(req.params.category);
  res.render("../views/product", { categories, product, category, products, user, sessionId: req.session.userId });
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

const createOrder = async (req, res) => {
  if(!req.session.userId)
    return null;
  const {
    address,
    city,
    country,
    zip,
    finalCart
  } = req.body;
  let cart = finalCart;
  const status = "waiting for approval";
  const userId = req.session.userId;
  if(address.length < 3){
    return res.status(404).json({ errors: ['Invallid address!'] });
  }if(city.length < 2){
    return res.status(404).json({ errors: ['Invallid city!'] });
  }if(country.length < 2){
    return res.status(404).json({ errors: ['Invallid country!'] });
  }if(zip.length !== 5 && zip.length !== 7 && Number(zip) !== zip){
    return res.status(404).json({ errors: ['zip should be 5 or 7 digits number!'] });
  }if(cart.length === 0){
    return res.status(404).json({ errors: ['you\'r cart is empty!'] });
  }
  let clientSideValidationErrors = [];
  const user = await userService.getUserById(userId);
  const firstName = user.firstName;
  const lastName = user.lastName;
  let cost = 0;
  for(let i = 0; i < cart.length; i ++){
    let prod = await productService.getProductById(cart[i].id);
    if(prod){
      if(cart[i].name !== prod.name)
        clientSideValidationErrors.push('The name ' + cart[i].name + ' is not match!');
      else if(!prod.categories.includes(cart[i].category))
        clientSideValidationErrors.push('The category ' + cart[i].category + ' is not match for' + cart[i].name);
      else if(!prod.colors.includes(cart[i].color))
        clientSideValidationErrors.push('The color you chose for ' + cart[i].name + ' is not availble!');
      else if(!prod.sizes.includes(cart[i].size))
        clientSideValidationErrors.push('The size you chose for ' + cart[i].name + ' is not availble!');
      else if(prod.amount > prod.amount)
        clientSideValidationErrors.push('The amount you requested for ' + cart[i].name + ' is not availble!');
      else
        cost += cart[i].amount * prod.price;
    }else
      clientSideValidationErrors.push('The product ' + cart[i].name + ' is not availble!');
  }
  if(clientSideValidationErrors.length){
    return res.status(404).json(JSON.stringify(clientSideValidationErrors));
  }else{
    cart = JSON.stringify(finalCart);
    const newOrder = await orderService.createOrder(
      userId,
      firstName,
      lastName,
      address,
      city,
      country,
      zip,
      cart,
      status,
      cost);
    if(newOrder){
      return res.status(200).json(newOrder);
    }else{
      return res.status(404).json(error);
    }
  }
};

module.exports = {
  index,
  cart,
  category,
  product,
  getCategories,
  createCategory,
  createProduct,
  getProduct,
  deleteProduct,
  getProducts,
  getProductsByCategoryName,
  updateProduct,
  createOrder
};