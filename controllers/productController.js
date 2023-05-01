const Product = require("../models/products")

async function allProducts(req, res) {
  const product = new Product()
  const products = await product.getAllProducts()
  res.render("allProducts", {products: products})
}

module.exports = {
  allProducts: allProducts
}
