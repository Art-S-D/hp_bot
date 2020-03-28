const { addPnj, getPnj, listPnj, removePnj } = require("./subcommands");
const parser = require("./parser.js");
const { hasRole } = require("../utils/hasRole");

//FOR REFERENCE
const _pnjAction = {
  get: 1,
  update: 2,
  remove: 3,
  add: 4,
  list: 5
};

const pnjActions = [null, getPnj, null, removePnj, addPnj, listPnj];

async function pnj(msg) {
  if (hasRole(msg, "MJ")) {
    msg.reply("Vous devez être MJ pour effectuer cette action.");
    return;
  }
  try {
    const pnjAst = parser.parse(msg.content);
    console.log(pnjAst);
    await pnjActions[pnjAst.type](msg, pnjAst);
  } catch (e) {
    msg.reply(e.message || e);
    throw e;
  }
}

module.exports = pnj;
