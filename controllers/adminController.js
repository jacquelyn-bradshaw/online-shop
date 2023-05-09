const Product = require("../models/product")

function viewAdmin(req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("403")
  }
  res.render("admin")
}

function addProductView(req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("403")
  }
  res.render("addProduct")
}

async function addProduct(req, res) {
  const {title, price, summary} = req.body

  const newProduct = new Product(title, price, summary)
  const addProduct = await newProduct.saveProduct()
}

module.exports = {
  viewAdmin: viewAdmin,
  addProductView: addProductView,
  addProduct: addProduct
}
