const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pnj = new Schema({
  name: String,
  details: String,
  picture: mongoose.ObjectId
});

module.exports = mongoose.model("Pnj", Pnj);
