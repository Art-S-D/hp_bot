import { Message } from "discord.js";
import { Pnj, IPnj } from "mongo";

export async function updatePnj(msg: Message, ast) {
  const _pnj: IPnj | null = await Pnj.findOne(ast.pnj);

  if (!_pnj) throw "Aucun pnj ne correspond à la description";
  const pnj = _pnj as IPnj;

  if (ast.set && ast.set.name) pnj.name = ast.set.name;
  if (ast.set && ast.set.year) pnj.year = ast.set.year;
  if (ast.set && ast.set.description) pnj.description = ast.set.description;

  if (msg.attachments.size > 1) throw "Trop de fichiers joint au message";
  if (msg.attachments.size === 1) {
    const pic = msg.attachments.array()[0];
    pnj.picture = pic.url;
  }

  pnj.markModified("");
  await pnj.save();

  msg.reply("Pnj modifié!");
}

updatePnj.mjRequired = true;
