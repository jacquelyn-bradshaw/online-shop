const db = require("../data/database")

const Product = require("../models/products")

async function allProducts(req, res) {
  //const product = new Product(null, null)
  //const products = await product.getAllProducts
  const products = await db
  .getDb()
  .collection("products")
  .find({}, { title: 1, summary: 1})
  .toArray()
  res.render("allProducts", {products: products})
}

module.exports = {
  allProducts: allProducts
}
