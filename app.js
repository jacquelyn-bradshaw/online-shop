const path = require("path")

const express = require("express")
const session = require("express-session")
const csrf = require("csurf")

const sessionConfig = require("./config/session")
const db = require("./data/database")
const authRoutes = require("./routes/auth")
const addCSRFTokenMiddleware = require("./middlewares/csrf-token-middleware")

const MongoDBSessionStore = sessionConfig.createSessionStore(session)

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

app.use(session(sessionConfig.createSessionConfig(MongoDBSessionStore)))

app.use(csrf())

app.use(addCSRFTokenMiddleware)

app.get("/", function(req, res) {
  res.render("index")
})

app.use(authRoutes)

db.connectToDatabase().then(function () {
  app.listen(3000)
})
