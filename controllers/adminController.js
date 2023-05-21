const Product = require("../models/product")
const validation = require("../validation/validation")
const validationSession = require("../validation/validation-session")

function viewAdmin(req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("403")
  }
  res.render("admin/admin")
}

function addProductView(req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("errors/403")
  }

  sessionErrorData = validationSession.getSessionErrorData(req, {
    title: "",
    image: "",
    price: "",
    summary: ""
  })

  res.render("addProduct", {inputData: sessionErrorData})
}

async function addProduct(req, res) {
  const {title, price, summary} = req.body

  const image = req.locals.filename

  if (!req.file || !validation.productIsValid(title, image, price, summary)) {
    validationSession.flashErrorsToSession(req, {
      message: "Invalid input - please check your data",
      title: title,
      image: image,
      price: price,
      summary: summary
    },
    function () {
      res.redirect("/add")
    })
    
    return
  }

  const newProduct = new Product(title, image, price, summary)
  await newProduct.saveProduct()

  res.redirect("/admin")
}

async function editProductView(req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("errors/403")
  }
  
  let product = new Product(null, null, null, null, req.params.id)
  product = await product.getProduct()

  if (!product) {
    return res.status(404).render("errors/404")
  }

  res.render("editProduct", {product: product})
}

async function updateProduct(req, res) {
  const {title, price, summary} = req.body

  const image = req.locals.filename

  const newProduct = new Product(title, image, price, summary, req.params.id)
  await newProduct.updateProduct()

  res.redirect("/admin")
}

async function deleteProduct(req, res) {
  const deleteProduct = new Product(null, null, null, null, req.params.id)
  await deleteProduct.delProduct()

  res.redirect("/admin")
}

module.exports = {
  viewAdmin: viewAdmin,
  addProductView: addProductView,
  addProduct: addProduct,
  editProductView: editProductView,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
}
