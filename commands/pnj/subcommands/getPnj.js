const { Attachment } = require("discord.js");
const { Pnj } = require("../../../models");
const printPnj = require("./printPnj");

async function getPnj(msg, ast) {
  const pnj = await Pnj.findOne(ast.pnj);
  if (!pnj) {
    throw "Aucun pnj ne correspond à la description";
  } else {
    printPnj(msg, pnj);
  }
}

module.exports = getPnj;
