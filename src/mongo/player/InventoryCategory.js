const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Card = require("./Card");

const InventoryCategory = new Schema({
  name: String,
  items: [String],
  __t: { type: String, default: "InventoryCategory" },
});

async function cardsToString(category) {
  function countSimilarCards(cards) {
    let res = {};
    for (const c of cards) {
      if (!res[c]) res[c] = 1;
      else res[c]++;
    }
    return Object.entries(res);
  }

  function cardToString(card, amount) {
    if (amount === 1) return card.asString;
    return `${card.asString}\tx${amount}`;
  }

  let com = "";
  let rare = "";
  let leg = "";
  for (const [c, amount] of countSimilarCards(category.items)) {
    const card = await Card.findById(c);
    if (!card) {
      console.error(`missing card ${c}`);
      continue;
    }
    if (card.category === "C") com = `${com}\n${cardToString(card, amount)}`;
    if (card.category === "R") rare = `${rare}\n${cardToString(card, amount)}`;
    if (card.category === "L") leg = `${leg}\n${cardToString(card, amount)}`;
  }
  return `${category.name}${com}${rare}${leg}\n---`;
}

InventoryCategory.virtual("asString").get(async function () {
  if (this.__t === "cards") return cardsToString(this);
  return `${this.name}\n${this.items.join("\n")}\n---`;
});

module.exports = InventoryCategory;
