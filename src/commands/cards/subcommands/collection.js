const { Card } = require("mongo");

async function collection(msg, player) {
  msg.reply(await player.cards.asString, { split: true });
}

module.exports = collection;
