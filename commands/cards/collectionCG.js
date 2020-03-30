const { Card } = require("../../models");

async function collectionCG(msg, player) {
  if (
    process.argv.includes("unsafe") ||
    msg.guild.id === "661804149129871371"
  ) {
    let reply = "";
    for (const c of player.cards) {
      const card = await Card.findById(c);
      reply = `${reply}\n${card.asString}`;
    }
    msg.reply(reply);
  } else msg.reply("Unauthorised");
}

module.exports = collectionCG;
