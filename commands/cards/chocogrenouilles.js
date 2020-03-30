const { Card } = require("../../models");

async function chocogrenouilles(msg, player) {
  if (
    process.argv.includes("unsafe") ||
    msg.guild.id === "661804149129871371"
  ) {
    const random = Math.floor(Math.random() * (await Card.countDocuments()));
    const card = await Card.findOne().skip(random);
    msg.reply(card.asString);

    if (!player.cards) player.cards = [];
    player.cards.push(card._id);
    player.markModified();
    player.markModified("cards");
    await player.save();
  } else msg.reply("Unauthorised");
}

module.exports = chocogrenouilles;
