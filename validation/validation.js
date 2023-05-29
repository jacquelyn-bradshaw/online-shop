function userCredentialsAreValid(email, confirmEmail, password, fullName, street, city, postcode) {
  return email && 
  confirmEmail && 
  password && 
  fullName &&
  street &&
  city &&
  postcode &&
  password.trim().length > 6 && 
  email === confirmEmail && 
  email.includes("@") &&
  fullName.trim() !== "" &&
  street.trim() !== "" &&
  city.trim() !== "" &&
  postcode.trim() !== ""
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
