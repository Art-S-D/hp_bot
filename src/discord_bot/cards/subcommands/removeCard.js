const addCard = require("./addCard");
const { Card } = require("mongo");

async function removeCard(msg, player, name) {
  const card = await Card.findOne({ name });

  if (!card) throw `Carte inconnue ${name}`;

  let removed = false;
  player.cards = player.cards.filter((x) => {
    if (!removed && x._id.toString() === card._id.toString()) {
      removed = true;
      return false;
    }
    return true;
  });
  if (!removed) {
    msg.reply("Vous ne possédez pas cette carte");
    return;
  }
  player.markModified("cards");
  await player.save();
  msg.reply("carte supprimée");
}

module.exports = removeCard;
