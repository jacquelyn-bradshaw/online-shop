const express = require("express")

const adminController = require("../controllers/adminController")

const router = express.Router()

router.get("/admin", adminController.viewAdmin)

router.get("/add", adminController.addProductView)

router.post("/add", adminController.addProduct)

module.exports = router
