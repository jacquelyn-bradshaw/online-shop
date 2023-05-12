function userCredentialsAreValid(email, confirmEmail, password) {
  return email && 
  confirmEmail && 
  password && 
  password.trim().length > 6 && 
  email === confirmEmail && 
  email.includes("@")
}

function productIsValid(title, image, price, summary) {
  return title && 
  image &&
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
