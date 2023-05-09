function userCredentialsAreValid(email, confirmEmail, password) {
  return email && 
  confirmEmail && 
  password && 
  password.trim().length > 6 && 
  email === confirmEmail && 
  email.includes("@")
}

function productIsValid(title, price, summary) {
  return title && 
  price && 
  summary &&
  title.trim() !== "" && 
  price.trim() !== "" &&
  summary.trim() !== ""
}

module.exports = {
  userCredentialsAreValid: userCredentialsAreValid,
  productIsValid: productIsValid
}
