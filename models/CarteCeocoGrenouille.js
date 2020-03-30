const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Card = new Schema({
  category: {
    type: String,
    required: true,
    enum: ["C", "R", "L"]
  },
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  description: { type: String, required: true }
});

Card.virtual("asString").get(function() {
  return `{${this.category}} | ${this.name} | ${this.description}`;
});

module.exports = mongoose.model("Card", Card);
