const { Pnj } = require("mongo");

async function removePnj(msg, ast) {
  const removed = await Pnj.findOneAndDelete(ast.pnj);
  if (removed) {
    msg.reply("Pnj supprimé!");
  } else {
    throw "Pnj inconnu";
  }
}

removePnj.mjRequired = true;
module.exports = removePnj;
