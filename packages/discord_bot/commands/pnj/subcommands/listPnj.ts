import { Message } from "discord.js";
import { Pnj, IPnj } from "mongo";
import printPnj from "./printPnj";

export async function listPnj(msg: Message, ast) {
  const pnjs: IPnj[] = await Pnj.find({});
  for (const p of pnjs) {
    printPnj(msg, p);
  }
}

listPnj.mjRequired = true;
