const path = require("path")

const express = require("express")
const session = require("express-session")
//const csrf = require("csurf")
//const csrf = require("tiny-csrf")
//const cookieParser = require("cookie-parser")

const sessionConfig = require("./config/session")
const db = require("./data/database")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const productRoutes = require("./routes/products")
const authMiddleware = require("./middlewares/authMiddleware")
//const addCSRFTokenMiddleware = require("./middlewares/csrf-token-middleware")

const MongoDBSessionStore = sessionConfig.createSessionStore(session)

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

//app.use(cookieParser("cookie-parser-secret"))
// app.use(session({ secret: "keyboard cat" }))


app.use(session(sessionConfig.createSessionConfig(MongoDBSessionStore)))
//app.use(csrf("123456789iamasecret987654321look"))
//app.use(csrf())

//app.use(addCSRFTokenMiddleware)
app.use(authMiddleware)

app.get("/", function(req, res) {
  res.render("index")
})

app.use(authRoutes)
app.use(adminRoutes)
app.use(productRoutes)

app.use(function(error, req, res, next) {
  console.log(JSON.stringify(error));
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000)
})
