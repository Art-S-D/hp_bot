import { Message } from "discord.js";
import { Pnj, IPnj } from "mongo";

export async function addPnj(msg: Message, ast) {
  const test: IPnj | null = await Pnj.findOne(ast.pnj);
  if (test) throw "Ce pnj existe déjà!";

  const pnj: IPnj = new Pnj({ ...ast.pnj, description: ast.description });

  if (msg.attachments.size > 1) throw "Trop de fichiers joint au message";
  if (msg.attachments.size === 1) {
    const pic = msg.attachments.array()[0];
    pnj.picture = pic.url;
  }

  await pnj.save();
  msg.reply("Pnj créée!");
}

addPnj.mjRequired = true;
