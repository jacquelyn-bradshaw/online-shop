const express = require("express")
//const multer = require("multer")
const adminController = require("../controllers/adminController")
//const upload = require("../config/imageStorage")

//const upload = multer({ dest: "images/"})

const router = express.Router()

router.get("/admin", adminController.viewAdmin)

router.get("/add", adminController.addProductView)

router.post("/add", adminController.addProduct)

module.exports = router
