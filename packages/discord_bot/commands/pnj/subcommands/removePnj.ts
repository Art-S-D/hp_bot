import { Message } from "discord.js";
import { Pnj, IPnj } from "mongo";

export async function removePnj(msg: Message, ast) {
  const removed: IPnj | null = await Pnj.findOneAndDelete(ast.pnj);

  if (removed) {
    msg.reply("Pnj supprimé!");
  } else {
    throw "Pnj inconnu";
  }
}

removePnj.mjRequired = true;
