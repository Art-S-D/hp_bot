const { replyLongMessage } = require("../../utils");

async function addCard(msg, player, card) {
  msg.reply(card.asString);

  if (!player.cards) player.cards = [];
  player.cards.push(card._id);
  player.markModified();
  player.markModified("cards");
  await player.save();
}

async function addCards(msg, player, cards) {
  const reply = cards.map((c) => c.asString).join("\n");
  replyLongMessage(msg, reply);

  if (!player.cards) player.cards = [];
  player.cards = player.cards.concat(cards.map((c) => c._id));
  player.markModified();
  player.markModified("cards");
  await player.save();
}

module.exports = { addCard, addCards };
