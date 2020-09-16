import { Message } from "discord.js";
import grammar = require("./grammar.js");
import { IPlayer } from "mongo";

import { addEnduranceRerollReactions, isLearningRoll } from "./enduranceDie";

async function shazam(msg: Message) {
  await msg.react("🇸");
  await msg.react("🇭");
  await msg.react("🇦");
  await msg.react("🇿");
  await msg.react("🅰️");
  await msg.react("🇲");
  // await msg.react("⚡");
}

async function reply_roll(
  msg: Message,
  score: number,
  bonus1: number | undefined,
  bonus2: number | undefined,
  diff: number
): Promise<[Message, number]> {
  let res: string = `${score}`; // message to reply with
  let value: number = score; // value of the roll

  if (bonus1 != null) {
    res = `${res} + ${bonus1}`;
    value += bonus1;
  }
  if (bonus2 != null) {
    res = `${res} + ${bonus2}`;
    value += bonus2;
  }
  res = `${res} = ${value}`;

  const mark = value >= diff ? ":white_check_mark:" : ":x:";
  res = `${res}\t <@293149809387241472>${mark}`;

  const response = await msg.reply(res);
  if (score >= 20) await shazam(response);
  return [response, value];
}

type bonus = number | string;
interface d20grammar {
  bonus1?: bonus;
  bonus2?: bonus;
  reroll?: bonus;
  diff: bonus;
}

// returns the response and the value rolled
export async function d20(
  msg: Message,
  player: IPlayer | null,
  die: d20grammar
): Promise<[Message, number]> {
  let { bonus1, bonus2, reroll, diff }: d20grammar = die;

  // if x is a number, returns x, otherwise returns the stat of the player that x represents
  function cast(x?: bonus): number | undefined {
    if (typeof x === "string" && !player) throw new Error("joueur inconu");
    if (typeof x === "string") return (<IPlayer>player).getStat(x);
    return <number | undefined>x;
  }

  const _bonus1: undefined | number = cast(bonus1);
  const _bonus2: undefined | number = cast(bonus2);
  const _reroll: number = cast(reroll) || -1;
  const _diff: number = cast(diff) || 15;

  let score: number = Math.ceil(Math.random() * 20);

  if (score <= _reroll) {
    reply_roll(msg, score, _bonus1, _bonus2, _diff);
    score = Math.ceil(Math.random() * 20);
    return reply_roll(msg, score, _bonus1, _bonus2, _diff);
  } else return reply_roll(msg, score, _bonus1, _bonus2, _diff);
}

export async function d(msg: Message, player: IPlayer | null) {
  const die: d20grammar = grammar.parse(msg.content) as d20grammar;
  const [response] = await d20(msg, player, die);

  if (isLearningRoll(die) && player != null)
    await addEnduranceRerollReactions(response, player as IPlayer, msg);
}
