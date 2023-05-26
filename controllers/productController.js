const mongodb = require("mongodb")
const Product = require("../models/product")

async function allProducts(req, res) {
  const product = new Product()

  let products
  try {
    products = await product.getAllProducts()
  } catch (error) {
    next(error)
    return
  }
  
  res.render("product/allProducts", {products: products})
}

async function viewProduct(req, res) {
  let product = new Product(null, null, null, null, req.params.id)
  
  try {
    product = await product.getProduct()
  } catch (error) {
    next(error)
    return
  }

  if(!product) {
    return res.status(404).render("errors/404")
  }

  res.render("product/singleProduct", {product: product})
}

module.exports = {
  allProducts: allProducts,
  viewProduct: viewProduct
}
