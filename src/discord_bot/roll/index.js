const parser = require("./parser.js");
const arithmetic = require("../utils/arithmetic");
const { autoReroll } = require("../utils/autoReroll");

function roll_result(msg, res, objectif, bonus, faces, relance) {
  msg.reply(
    `résultat: ${res}${
      bonus ? `+${bonus}=${res + bonus}` : ""
    }, attendu: ${objectif},   (faces:${faces}, relance: ${relance})`
  );
}

async function roll(msg, player) {
  let { faces, objectif, bonus, relance, joueur, cheat = false } = parser.parse(
    msg.content
  );

  if (!player) {
    msg.reply("joueur inconnu");
    return;
  }

  if (relance === "auto") {
    const r = autoReroll(bonus);
    if (r === null) throw "imporrible de déterminer une relance auto";
    msg.reply(`relance ${r}`);
    relance = { word: r };
  }

  let relance_val = 0;
  let bonus_val = 0;
  let objectif_val = 15;
  let faces_val = 20;

  relance_val = (relance && arithmetic(relance, player)) || relance_val;
  bonus_val = (bonus && arithmetic(bonus, player)) || bonus_val;
  objectif_val = (objectif && arithmetic(objectif, player)) || objectif_val;
  faces_val = (faces && arithmetic(faces, player)) || faces_val;

  if (cheat) {
    roll_result(
      msg,
      Math.max(faces_val, objectif_val),
      objectif_val,
      bonus_val,
      faces_val,
      relance_val
    );
    msg.reply("success");
    msg.reply("c'est bien parce que c'est toi");
    return;
  }

  let res = Math.ceil(Math.random() * faces_val);
  roll_result(msg, res, objectif_val, bonus_val, faces_val, relance_val);
  if (
    res + (bonus_val || 0) < objectif_val &&
    relance_val &&
    res <= relance_val
  ) {
    msg.reply("relance");
    res = Math.ceil(Math.random() * faces_val);
    roll_result(msg, res, objectif_val, bonus_val, faces_val, relance_val);
  }

  if (res + (bonus_val || 0) < objectif_val) msg.reply("fail");
  else msg.reply("success");
}

module.exports = roll;