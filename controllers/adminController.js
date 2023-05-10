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
    price: "",
    summary: ""
  })

  res.render("addProduct", {inputData: sessionErrorData})
}

async function addProduct(req, res) {
  const {title, price, summary} = req.body
  // const title = req.body.title
  // const price = req.body.price
  // const summary = req.body.summary

  //const image = req.file

  //const imagePath = uploadedImageFile.path

  if (!validation.productIsValid(title, price, summary)) {
    validationSession.flashErrorsToSession(req, {
      message: "Invalid input - please check your data",
      title: title,
      price: price,
      summary: summary
    },
    function () {
      res.redirect("/add")
    })

    return
  }

  const newProduct = new Product(title, price, summary)
  await newProduct.saveProduct()

//console.log(image)

  res.redirect("/admin")
}

module.exports = {
  viewAdmin: viewAdmin,
  addProductView: addProductView,
  addProduct: addProduct
}
