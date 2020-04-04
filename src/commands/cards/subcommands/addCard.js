async function addCard(msg, player, card) {
  msg.reply(card.asString);

  if (!player.cards) player.cards = [];
  player.cards.push(card._id);
  player.markModified();
  player.markModified("cards");
  await player.save();
}

module.exports = addCard;
