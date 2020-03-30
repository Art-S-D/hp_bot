const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pnj = new Schema({
  name: { type: String, required: true, index: true },
  house: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: false },
  picture: { type: String, required: false }
});

Pnj.virtual("fullName").get(function() {
  const yearSymbol =
    this.year > 0 ? `+${this.year}` : this.year === 0 ? "" : `${this.year}`;
  return `${this.name}[${this.house}.A${yearSymbol}]`;
});

module.exports = mongoose.model("Pnj", Pnj);
