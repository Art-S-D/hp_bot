import { Message } from "discord.js";
import { Player, IPlayer } from "mongo";

const statsToPrint = ["stats", "competences", "matieres"];

function printGrimoire(player: IPlayer) {
  let res = player.name + "\n";
  for (let i of statsToPrint) {
    res += i + ":\n";
    for (let j in player[i]) res += "\t" + j + ": " + player[i][j] + "\n";
    res += "\n";
  }
  return res;
}

export async function grimoire(msg: Message, player: IPlayer | null) {
  if (!player) throw "joueur inconnu";
  msg.reply(printGrimoire(<IPlayer>player.toJSON()), { split: true });
}

grimoire.critical = true;
