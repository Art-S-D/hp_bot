async function addCard(msg, player, card) {
  msg.reply(card.asString);

  if (!player.cards) player.cards = [];
  player.cards.push(card._id);
  player.markModified();
  player.markModified("cards");
  await player.save();
}

async function addCards(msg, player, cards) {
  if (!player.cards) throw "Ce joueur n'a pas d'inventaire de cartes";

  const reply = cards.map((c) => c.asString).join("\n");
  msg.reply("\n" + reply, { split: true });

  if (!player.cards.items) player.cards.items = [];
  player.cards.items = player.cards.items.concat(cards.map((c) => c._id));
  player.markModified();
  player.markModified("inventory");
  await player.save();
}

module.exports = { addCard, addCards };
