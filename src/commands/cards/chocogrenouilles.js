const { Card } = require("mongo");

async function chocogrenouilles(msg, player) {
  const random = Math.floor(Math.random() * (await Card.countDocuments()));
  const card = await Card.findOne().skip(random);
  msg.reply(card.asString);

  if (!player.cards) player.cards = [];
  player.cards.push(card._id);
  player.markModified();
  player.markModified("cards");
  await player.save();
}

chocogrenouilles.critical = true;
module.exports = chocogrenouilles;
