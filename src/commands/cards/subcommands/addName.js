const { addCards } = require("./addCard");
const { Card } = require("mongo");

async function addRandomCard(msg, player, name, mult) {
  const card = await Card.findOne({ name });

  if (!card) throw `Carte inconnue ${name}`;

  const cards = [];
  for (let i = 0; i < mult; i++) cards.push(card);
  await addCards(msg, player, cards);
}

module.exports = addRandomCard;
