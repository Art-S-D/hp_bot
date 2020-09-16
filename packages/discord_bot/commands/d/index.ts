import { Message } from "discord.js";
import grammar = require("./grammar.js");
import { Player, IPlayer } from "mongo";

async function shazam(msg: Message) {
  await msg.react("🇸");
  await msg.react("🇭");
  await msg.react("🇦");
  await msg.react("🇿");
  await msg.react("🅰️");
  await msg.react("🇲");
  // await msg.react("⚡");
}

function reply_roll(
  msg: Message,
  score: number,
  bonus1: number | undefined,
  bonus2: number | undefined,
  diff: number
) {
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

  msg.reply(res).then((reply: Message) => {
    if (score >= 20) shazam(reply);
  });
}

type bonus = number | string;
interface d20grammar {
  bonus1?: bonus;
  bonus2?: bonus;
  reroll?: bonus;
  diff: bonus;
}

export function d(msg: Message, player: IPlayer | null) {
  let { bonus1, bonus2, reroll, diff }: d20grammar = grammar.parse(msg.content);

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
    reply_roll(msg, score, _bonus1, _bonus2, _diff);
  } else reply_roll(msg, score, _bonus1, _bonus2, _diff);
}
