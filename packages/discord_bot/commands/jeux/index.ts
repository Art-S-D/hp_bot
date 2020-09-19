import { Message } from "discord.js";
import { IPlayer } from "mongo";
import { Jeu } from "./Jeu";

export async function jeux(msg: Message, player: IPlayer | null) {
  if (!player) return;
  try {
    await new Jeu(msg, player as IPlayer).start();
  } catch (e) {
    console.error(e);
  }
}
