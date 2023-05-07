async function auth (req, res, next) {
  const user = req.session.user
  const isAuth = req.session.isAuthenticated
  const isAdmin = req.session.isAdmin

  if (!user || !isAuth) {
    return next()
  }

  res.locals.isAuth = isAuth

  if(!isAdmin) {
    return next()
  }

  res.locals.isAdmin = isAdmin

  next()
}

module.exports = auth
