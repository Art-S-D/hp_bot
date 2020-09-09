const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const grammar = require("./grammar.js");

const Pnj = new Schema({
  name: { type: String, required: true, index: true },
  house: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: false },
  picture: { type: String, required: false },
});

Pnj.virtual("fullName").get(function () {
  const yearSymbol =
    this.year > 0 ? `+${this.year}` : this.year === 0 ? "" : `${this.year}`;
  return `${this.name}[${this.house}.A${yearSymbol}]`;
});

Pnj.static("parseName", function (name) {
  try {
    return grammar.parse(pnjName);
  } catch (e) {
    console.error(e);
    return null;
  }
});

Pnj.static("getFromName", function (pnjName) {
  try {
    const { name, house, year } = grammar.parse(pnjName);
    return this.findOne({ name, house, year });
  } catch (e) {
    console.error(e);
    return null;
  }
});

module.exports = mongoose.model("Pnj", Pnj);
