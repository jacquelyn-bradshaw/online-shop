const bcrypt = require("bcryptjs")
const db = require("../data/database")

class User {
  constructor(email, password, fullName, street, city, postcode) {
    this.email = email
    this.password = password
    this.fullName = fullName
    this.address = {
      street: street,
      city: city,
      postcode: postcode}
  }

  async getUserWithSameEmail() {
    const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({email: this.email})

    return existingUser
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail()
    if (existingUser) {
      return true
    } else {
      return false
    }
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12)
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullName: this.fullName,
      address: this.address
    })
  }

  async login(comparePassword) {
    const passwordsAreEqual = await bcrypt.compare(
      this.password,
      comparePassword
    )
    return passwordsAreEqual
  }
}

module.exports = User
