const addCard = require("./addCard");
const { Card } = require("mongo");

async function addCategory(msg, player, category) {
  if (category !== "C" && category !== "R" && category !== "L")
    throw `wrong category ${category}`;
  const count = await Card.find({ category }).countDocuments();
  const card = await Card.findOne({ category }).skip(
    Math.floor(Math.random() * count)
  );

  if (!card) throw `Aucune carte trouvée`;

  await addCard(msg, player, card);
}

module.exports = addCategory;
