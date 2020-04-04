const { Card } = require("mongo");

async function addCard(msg, player, card) {
  msg.reply(card.asString);

  if (!player.cards) player.cards = [];
  player.cards.push(card._id);
  player.markModified();
  player.markModified("cards");
  await player.save();
}

async function chocogrenouilles(msg, player) {
  let getQuery = null;

  let rand = Math.random();
  if (rand < 0.01) getQuery = () => Card.findOne({ category: "L" });
  else if (rand < 0.1) getQuery = () => Card.findOne({ category: "R" });
  else getQuery = () => Card.findOne({ category: "C" });

  const card = await getQuery().skip(
    Math.floor(Math.random() * (await getQuery().countDocuments()))
  );
  await addCard(msg, player, card);
}

chocogrenouilles.critical = true;
module.exports = chocogrenouilles;
