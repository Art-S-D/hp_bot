const { addCards } = require("./addCard");
const { Card } = require("mongo");

async function addCategory(msg, player, category, multiplier) {
  if (category !== "C" && category !== "R" && category !== "L")
    throw `wrong category ${category}`;

  const cards = [];
  const count = await Card.find({ category }).countDocuments();
  for (let i = 0; i < multiplier; i++) {
    let card = await Card.findOne({ category }).skip(
      Math.floor(Math.random() * count)
    );
    if (!card) throw `Aucune carte trouvée`;
    cards.push(card);
  }

  await addCards(msg, player, cards);
}

module.exports = addCategory;
