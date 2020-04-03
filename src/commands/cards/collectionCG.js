const { Card } = require("mongo");

async function collectionCG(msg, player) {
  let reply = "";
  for (const c of player.cards) {
    const card = await Card.findById(c);
    if (reply === "") reply = card.asString;
    else reply = `${reply}\n${card.asString}`;
  }
  msg.reply(reply);
}

collectionCG.critical = true;
module.exports = collectionCG;
