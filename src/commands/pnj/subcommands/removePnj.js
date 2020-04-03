const { Pnj } = require("mongo");

async function removePnj(msg, ast) {
  const removed = await Pnj.findOneAndDelete(ast.pnj);
  if (removed) {
    msg.reply("Pnj supprimé!");
    console.log("Pnj removed!");
  } else {
    throw "Pnj inconnu";
  }
}

module.exports = removePnj;
