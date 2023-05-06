const mongodb = require("mongodb")

const ObjectId = mongodb.ObjectId

const Product = require("../models/product")

async function allProducts(req, res) {
  const product = new Product()
  const products = await product.getAllProducts()
  res.render("allProducts", {products: products})
}

async function viewProduct(req, res) {
  let productId = req.params.id

  try {
    productId = new ObjectId(productId)
  } catch {
    return res.status(404).render("404")
  }

  let product = new Product()
  product = await product.getProduct(productId)
  
  if(!product) {
    return res.status(404).render("404")
  }

  res.render("singleProduct", {product: product})
}

module.exports = {
  allProducts: allProducts,
  viewProduct: viewProduct
}
