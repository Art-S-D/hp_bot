const addCard = require("./addCard");
const { Card } = require("mongo");

async function addRandomCard(msg, player) {
  let getQuery = null;

  let rand = Math.random();
  if (rand < 0.01) getQuery = () => Card.findOne({ category: "L" });
  else if (rand < 0.1) getQuery = () => Card.findOne({ category: "R" });
  else getQuery = () => Card.findOne({ category: "C" });

  const card = await getQuery().skip(
    Math.floor(Math.random() * (await getQuery().countDocuments()))
  );
  await addCard(msg, player, card);
}

module.exports = addRandomCard;
