const express = require("express")

const router = express.Router()

router.get("/signup", function (req, res) {
  res.render("authentication/signup")
})

router.get("/login", function (req, res) {
  res.render("authentication/login")
})

module.exports = router
