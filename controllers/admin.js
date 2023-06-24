const Product = require('../models/product')

exports.getAddProduct = (req, res, next) =>{
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  // const { title, imageUrl, price, description } = req.body 
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product =  new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) =>{
  const editMode = req.query.edit;  // 값을 갖고 있으면 문자열 "true"가 됨 없으면 false
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', { 
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product', 
      editing: editMode,
      product: product
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId, 
    updatedtitle, 
    updatedImageUrl, 
    updatedDesc, 
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products, 
      pageTitle: 'Admin Products', 
      path: "/admin/products", 
  }); 
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
}