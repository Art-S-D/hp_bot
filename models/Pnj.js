const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pnj = new Schema({
  name: String,
  house: String,
  year: Number,
  description: String,
  picture: String
});

Pnj.virtual("fullName").get(() => {
  const yearSymbol =
    this.year > 0 ? `+${this.year}` : this.year === 0 ? "" : `${this.year}`;
  return `${this.name}[${this.house}.A${yearSymbol}]`;
});

module.exports = mongoose.model("Pnj", Pnj);
