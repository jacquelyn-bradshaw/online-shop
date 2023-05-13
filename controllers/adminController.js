const Product = require("../models/product")
const validation = require("../validation/validation")
const validationSession = require("../validation/validation-session")

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

  const image = req.file.originalname

  if (!validation.productIsValid(title, image, price, summary)) {
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

module.exports = {
  viewAdmin: viewAdmin,
  addProductView: addProductView,
  addProduct: addProduct
}
