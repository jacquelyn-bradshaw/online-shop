const mongodb = require("mongodb")
const db = require("../data/database")

const ObjectId = mongodb.ObjectId

class Product {
  constructor(title, image, price, summary, id) {
    this.title = title
    this.image = image
    this.price = price
    this.summary = summary
    if (id) {
      this.id = new ObjectId(id)
    }
  }

  async getAllProducts() {
    const products = await db
    .getDb()
    .collection("products")
    .find({}, { title: 1, image: 1})
    .toArray()

    return products
  }

  async getProduct() {
    const product = await db
    .getDb()
    .collection("products")
    .findOne({_id: this.id})

    return product
  }

  async saveProduct() {
    const result = await db.getDb().collection("products").insertOne({
      title: this.title,
      image: this.image,
      price: this.price,
      summary: this.summary
    })
    return result
  }

  async updateProduct() {
    const result = await db.getDb().collection("products").updateOne({_id: this.id}, { $set: {
      title: this.title,
      image: this.image,
      price: this.price,
      summary: this.summary
    }})
  }
}

module.exports = Product
