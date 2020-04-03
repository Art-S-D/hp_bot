const {
  addPnj,
  getPnj,
  listPnj,
  removePnj,
  updatePnj,
} = require("./subcommands");
const parser = require("./parser.js");
const hasRole = require("../utils/hasRole");

//FOR REFERENCE
const _pnjAction = {
  get: 1,
  update: 2,
  remove: 3,
  add: 4,
  list: 5,
};

const pnjActions = [getPnj, updatePnj, removePnj, addPnj, listPnj];

async function pnj(msg) {
  try {
    const pnjAst = parser.parse(msg.content);
    if (pnjActions[pnjAst.type - 1].mjRequired && !hasRole(msg, "MJ")) {
      msg.reply("Vous devez être MJ pour effectuer cette action.");
      return;
    }
    await pnjActions[pnjAst.type - 1](msg, pnjAst);
  } catch (e) {
    msg.reply(e.message || e);
    throw e;
  }
}

pnj.critical = true;
module.exports = pnj;
