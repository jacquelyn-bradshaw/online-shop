const User = require("../models/user")
const validationSession = require("../validation/validation-session")
const validation = require("../validation/validation")

function getSignup(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
    fullName: "",
    street: "",
    city: "",
    postcode: ""
  })

  res.render("authentication/signup", {inputData: sessionErrorData})
}

function getLogin(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    password: ""
  })
  res.render("authentication/login", {inputData: sessionErrorData})
}

async function signup(req, res) {
  const {email, confirmEmail, password, fullName, street, city, postcode} = req.body

  if (!validation.userCredentialsAreValid(email, confirmEmail, password, fullName, street, city, postcode)) {
    validationSession.flashErrorsToSession(req, {
      message: "Invalid input - please check your data",
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      fullName: fullName,
      street: street,
      city: city,
      postcode: postcode
    },
    function () {
      res.redirect("/signup")
    })
    return
  }

  const newUser = new User(email, password, fullName, street, city, postcode)
  const existingUser = await newUser.existsAlready()
  
  if(existingUser) {
    validationSession.flashErrorsToSession(req, {
      message: "User exists already.",
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      fullName: fullName,
      street: street,
      city: city,
      postcode: postcode
    },
    function () {
      res.redirect("/signup")
    })

    return
  }

  await newUser.signup()

  res.redirect("/login")
}

async function login(req, res) {
  const {email, password} = req.body

  const newUser = new User(email, password)
  const existingUser = await newUser.getUserWithSameEmail()

  if(!existingUser) {
    validationSession.flashErrorsToSession(req, {
      message: "Could not log you in - please check your credentials.",
      email: email,
      password: password
    },
    function () {
      res.redirect("/login")
    })

    return
  }

  const passwordsAreEqual = await newUser.login(existingUser.password)

  if(!passwordsAreEqual) {
    validationSession.flashErrorsToSession(req, {
      message: "Could not log you in - please check your credentials.",
      email: email,
      password: password
    },
    function () {
      res.redirect("/login")
    })

    return
  }

  req.session.user = {id: existingUser._id, email: existingUser.email}
  req.session.isAuthenticated = true
  req.session.isAdmin = existingUser.isAdmin
  req.session.save(function () {
    res.redirect("/products")
  })
}

function logout(req, res) {
  req.session.user = null
  req.session.isAuthenticated = false
  res.redirect("/")
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout:logout
}
