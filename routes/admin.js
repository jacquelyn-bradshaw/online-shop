const express = require("express")
const multer = require("multer")
const validation = require("../validation/validation")
const adminController = require("../controllers/adminController")

function hasRequiredFields({title, price, summary}, image) {
  return validation.productIsValid(title, image, price, summary)
}

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images")
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storageConfig,
  fileFilter: function(req, file, cb) {
    req.locals = {filename: file.originalname}
    cb(null, hasRequiredFields(req.body, file.originalname))
  }
})

const router = express.Router()

router.get("/admin", adminController.viewAdmin)

router.get("/add", adminController.addProductView)

router.post("/add", upload.single("image"), adminController.addProduct)

module.exports = router
