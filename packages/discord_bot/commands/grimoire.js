const { Player } = require("mongo");

const statsToPrint = ["stats", "competences", "matieres"];

function print_grimoire(player) {
  let res = player.name + "\n";
  for (i of statsToPrint) {
    res += i + ":\n";
    for (j in player[i]) res += "\t" + j + ": " + player[i][j] + "\n";
    res += "\n";
  }
  return res;
}

async function grimoire(msg) {
  const player = (await Player.getPlayerFromRole(msg)).toJSON();
  if (player) msg.reply(print_grimoire(player), { split: true });
  else msg.reply("joueur inconnu");
}

grimoire.critical = true;
module.exports = grimoire;
