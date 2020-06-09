const grammar = require("./grammar.js");
const { Player } = require("mongo");

function reply_roll(msg, score, b1, b2, d) {
  let res = `${score}`;
  let value = score;
  if (b1 !== undefined && b1 !== null) {
    res = `${res} + ${b1}`;
    value += b1;
  }
  if (b2 != undefined && b2 !== null) {
    res = `${res} + ${b2}`;
    value += b2;
  }
  res = `${res} = ${value}`;
  if (d) {
    const mark = value >= d ? ":white_check_mark:" : ":x:";
    res = `${res}\t <@293149809387241472>${mark}`;
  }
  msg.reply(res);
}

function d20(msg, player) {
  let { bonus1, bonus2, reroll, diff } = grammar.parse(msg.content);

  function cast(x) {
    if (typeof x === "string") {
      let tmp = Player.getStat(player, x);
      if (tmp === undefined) throw `stat inconnue ${x}`;
      return tmp;
    }
    return x;
  }

  bonus1 = cast(bonus1);
  bonus2 = cast(bonus2);
  reroll = cast(reroll);
  diff = cast(diff) || 15;

  let res = Math.ceil(Math.random() * 20);

  if (reroll && res <= reroll) {
    reply_roll(msg, res, bonus1, bonus2, null);
    res = Math.ceil(Math.random() * 20);
    reply_roll(msg, res, bonus1, bonus2, diff);
  } else reply_roll(msg, res, bonus1, bonus2, diff);
}

module.exports = d20;
