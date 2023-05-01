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
    .find({})
    //.project({title:1, summary:1})
    .toArray()

    return products
  }
}

module.exports = Product
