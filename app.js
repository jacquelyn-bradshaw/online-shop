const path = require('path');

const express = require("express")

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.get("/", function(req, res) {
  res.render("index")
})

app.listen(3000)