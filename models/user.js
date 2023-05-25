const bcrypt = require("bcryptjs")
const db = require("../data/database")

class User {
  constructor(email, password, fullName, street, city, postcode) {
    this.email = email
    this.password = password
    this.fullName = fullName
    this.street = street
    this.city = city
    this.postcode = postcode
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
    const result = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullName: this.fullName,
      street: this.street,
      city: this.city,
      postcode: this.postcode
    })
    return result
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
