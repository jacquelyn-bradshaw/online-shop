const db = require("../data/database")

class Product {
  constructor(title, summary) {
    this.title = title
    this.summary = summary
  }

  async getAllProducts() {
    const products = await db
    .getDb()
    .collection("products")
    .find({}, { title: 1, image: 1})
    .toArray()

    return products
  }

  async getProduct(id) {
    const product = await db
    .getDb()
    .collection("products")
    .findOne({_id: id})

    return product
  }
}

module.exports = Product
