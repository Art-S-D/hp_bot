const { Pnj } = require("mongo");
const printPnj = require("./printPnj");

async function listPnj(msg, ast) {
  const pnjs = await Pnj.find({});
  for (const p of pnjs) {
    printPnj(msg, p);
  }
}

module.exports = listPnj;
