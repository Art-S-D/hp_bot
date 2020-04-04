const addCard = require("./addCard");
const { Card } = require("mongo");

async function addRandomCard(msg, player, name) {
  const card = await Card.findOne({ name });

  if (!card) throw `Carte inconnue ${name}`;

  await addCard(msg, player, card);
}

module.exports = addRandomCard;
