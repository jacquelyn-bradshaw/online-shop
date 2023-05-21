const mongodb = require("mongodb")
const Product = require("../models/product")

async function allProducts(req, res) {
  const product = new Product()
  const products = await product.getAllProducts()
  res.render("product/allProducts", {products: products})
}

async function viewProduct(req, res) {
  let product = new Product(null, null, null, null, req.params.id)
  product = await product.getProduct()
  
  if(!product) {
    return res.status(404).render("errors/404")
  }

  res.render("product/singleProduct", {product: product})
}

module.exports = {
  allProducts: allProducts,
  viewProduct: viewProduct
}
