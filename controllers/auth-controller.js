const User = require("../models/user")
const validationSession = require("../validation/validation-session")
const validation = require("../validation/validation")

function getSignup(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: ""
  })

  res.render("authentication/signup", {inputData: sessionErrorData})
}

function getLogin(req, res) {
  res.render("authentication/login")
}

async function signup(req, res) {
  const {email, confirmEmail, password} = req.body

  if (!validation.userCredentialsAreValid(email, confirmEmail, password)) {
    validationSession.flashErrorsToSession(req, {
      message: "Invalid input - please check your data",
      email: email,
      confirmEmail: confirmEmail,
      password: password
    },
    function () {
      res.redirect("/signup")
    })
    return
  }

  const newUser = new User(email, password)
  const existingUser = await newUser.existsAlready()
  
  if(existingUser) {
    validationSession.flashErrorsToSession(req, {
      message: "User exists already.",
      email: email,
      confirmEmail: confirmEmail,
      password: password
    },
    function () {
      res.redirect("/signup")
    })

    return
  }

  await newUser.signup()

  res.redirect("/login")
}

function logout(req, res) {
  res.render("index")
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  logout:logout
}
