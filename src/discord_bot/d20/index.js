const grammar = require("./grammar.js");
const { Player } = require("mongo");

function reply_roll(msg, score, b1, b2) {
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
  msg.reply(`${res} = ${value}`);
}

function d20(msg, player) {
  let { bonus1, bonus2, reroll } = grammar.parse(msg.content);

  if (typeof bonus1 === "string") {
    let tmp = Player.getStat(player, bonus1);
    if (tmp === undefined) throw `stat inconnue ${bonus1}`;
    bonus1 = tmp;
  }
  if (typeof bonus2 === "string") {
    let tmp = Player.getStat(player, bonus2);
    if (tmp === undefined) throw `stat inconnue ${bonus2}`;
    bonus2 = tmp;
  }

  let res = Math.ceil(Math.random() * 20);
  reply_roll(msg, res, bonus1, bonus2);

  if (reroll && res < reroll) {
    res = Math.ceil(Math.random() * 20);
    reply_roll(msg, res, bonus1, bonus2);
  }
}

module.exports = d20;
