const path = require("path")

const express = require("express")
const session = require("express-session")

const sessionConfig = require("./config/session")
const db = require("./data/database")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const productRoutes = require("./routes/products")
const authMiddleware = require("./middlewares/authMiddleware")

const MongoDBSessionStore = sessionConfig.createSessionStore(session)

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.use(session(sessionConfig.createSessionConfig(MongoDBSessionStore)))

app.use(authMiddleware)

app.get("/", function(req, res) {
  res.render("index")
})

app.use(authRoutes)
app.use(adminRoutes)
app.use(productRoutes)

app.use(function(error, req, res, next) {
  console.log(JSON.stringify(error));
  res.status(500).render('errors/500');
})

db.connectToDatabase()
  .then(function () {
    app.listen(3000)
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!")
    console.log(error)
  })
