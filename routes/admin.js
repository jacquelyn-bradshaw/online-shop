const express = require("express")
const multer = require("multer")
const adminController = require("../controllers/adminController")

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images")
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storageConfig})

const router = express.Router()

router.get("/admin", adminController.viewAdmin)

router.get("/add", adminController.addProductView)

router.post("/add", upload.single("image"), adminController.addProduct)

module.exports = router
