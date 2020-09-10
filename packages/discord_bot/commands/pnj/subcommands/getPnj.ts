import { Message } from "discord.js";
import { Pnj, IPnj } from "mongo";
import printPnj from "./printPnj";

export async function getPnj(msg: Message, ast) {
  const pnj: IPnj | null = await Pnj.findOne(ast.pnj);
  if (!pnj) {
    throw "Aucun pnj ne correspond à la description";
  } else {
    printPnj(msg, pnj);
  }
}
