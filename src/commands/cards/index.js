const parser = require("./parser");
const cardType = {
  random: 0,
  name: 1,
  category: 2,
  collection: 3,
  remove: 4,
};
const {
  addCategory,
  addRandom,
  addName,
  collection,
  removeCard,
} = require("./subcommands");

async function carte(msg, player) {
  const { type, name, category } = parser.parse(msg.content);

  if (type === cardType.random) await addRandom(msg, player);
  else if (type === cardType.category) await addCategory(msg, player, category);
  else if (type === cardType.name) await addName(msg, player, name);
  else if (type === cardType.collection) await collection(msg, player);
  else if (type === cardType.remove) await removeCard(msg, player, name);
  else throw `Wrong type ${type}`;
}

carte.critical = true;
module.exports = carte;
