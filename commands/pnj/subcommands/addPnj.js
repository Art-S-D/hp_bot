const { Pnj } = require("../../../models");

async function addPnj(msg, ast) {
  const pnj = new Pnj({ ...ast.pnj, description: ast.description });

  if (msg.attachments.size > 1) throw "Trop de fichiers joint au message";
  if (msg.attachments.size === 1) {
    const pic = msg.attachments.array()[0];
    console.log(pic);
    pnj.picture = pic.url;
  }

  await pnj.save();
  msg.reply("Pnj créée!");
  console.log("Pnj added!");
}

module.exports = addPnj;
