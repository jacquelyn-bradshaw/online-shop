const db = require("../data/database")

class Product {
  constructor(title, price, summary) {
    this.title = title
    this.price = price
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

  async saveProduct() {
    const result = await db.getDb().collection("products").insertOne({
      title: this.title,
      price: this.price,
      summary: this.summary
    })
    return result
  }
}

module.exports = Product
