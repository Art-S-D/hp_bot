const {
  addPnj,
  getPnj,
  listPnj,
  removePnj,
  updatePnj
} = require("./subcommands");
const parser = require("./parser.js");
const hasRole = require("../utils/hasRole");

//FOR REFERENCE
const _pnjAction = {
  get: 1,
  update: 2,
  remove: 3,
  add: 4,
  list: 5
};

const pnjActions = [
  { mj: false, func: getPnj },
  { mj: true, func: updatePnj },
  { mj: true, func: removePnj },
  { mj: true, func: addPnj },
  { mj: true, func: listPnj }
];

async function pnj(msg) {
  if (process.argv.includes("unsafe") || msg.guild.id === "661804149129871371")
    try {
      const pnjAst = parser.parse(msg.content);
      if (pnjActions[pnjAst.type - 1].mj && !hasRole(msg, "MJ")) {
        msg.reply("Vous devez être MJ pour effectuer cette action.");
        return;
      }
      await pnjActions[pnjAst.type - 1].func(msg, pnjAst);
    } catch (e) {
      msg.reply(e.message || e);
      throw e;
    }
  else {
    msg.reply("Unauthorized");
    console.error("Unaothorized call");
    console.error(msg.guild.id);
  }
}

module.exports = pnj;
