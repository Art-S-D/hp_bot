const { addCards } = require("./addCard");
const { Card } = require("mongo");

async function addRandomCard(msg, player, mult) {
  let getQuery = null;
  const cards = [];

  for (let i = 0; i < mult; i++) {
    let rand = Math.random();
    if (rand < 0.01) getQuery = () => Card.findOne({ category: "L" });
    else if (rand < 0.1) getQuery = () => Card.findOne({ category: "R" });
    else getQuery = () => Card.findOne({ category: "C" });

    cards.push(
      await getQuery().skip(
        Math.floor(Math.random() * (await getQuery().countDocuments()))
      )
    );
  }
  await addCards(msg, player, cards);
}

module.exports = addRandomCard;
