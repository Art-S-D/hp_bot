const { Pnj } = require("mongo");

async function addPnj(msg, ast) {
  const test = await Pnj.findOne(ast.pnj);
  if (test) throw "Ce pnj existe déjà!";
  const pnj = new Pnj({ ...ast.pnj, description: ast.description });

  if (msg.attachments.size > 1) throw "Trop de fichiers joint au message";
  if (msg.attachments.size === 1) {
    const pic = msg.attachments.array()[0];
    pnj.picture = pic.url;
  }

  await pnj.save();
  msg.reply("Pnj créée!");
  console.log("Pnj added!");
}

module.exports = addPnj;
