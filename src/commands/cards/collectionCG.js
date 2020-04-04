const { Card } = require("mongo");

/*
 * returns a list of pairs [cardId, amount]
 */
function countSimilarCards(cards) {
  let res = {};
  for (const c of cards) {
    if (!res[c]) res[c] = 1;
    else res[c]++;
  }
  return Object.entries(res);
}

function cardToString(card, amount) {
  if (amount === 1) return card.asString;
  return `${card.asString}\tx${amount}`;
}

async function collectionCG(msg, player) {
  let com = "";
  let rare = "";
  let leg = "";
  for (const [c, amount] of countSimilarCards(player.cards)) {
    const card = await Card.findById(c);
    if (card.category === "C") com = `${com}\n${cardToString(card, amount)}`;
    if (card.category === "R") rare = `${rare}\n${cardToString(card, amount)}`;
    if (card.category === "L") leg = `${leg}\n${cardToString(card, amount)}`;
  }
  msg.reply(`${com}${rare}${leg}`);
}

collectionCG.critical = true;
module.exports = collectionCG;
