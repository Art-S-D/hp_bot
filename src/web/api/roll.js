const express = require("express");
const app = express.Router();

const STORE_LAST = 50;
let rolls = [];

app.get("/latest", async function (req, res) {
  /*const tmp = req.param.date
    ? rolls.filter((x) => x.date.getTime() > req.body.date)
    : rolls;*/
  const tmp = rolls.sort((a, b) => a.date - b.date);
  res.status(200).send(tmp);
});

function getBonus(player, bonus) {
  return (
    player.stats[bonus] || player.competences[bonus] || player.matieres[bonus]
  );
}
app.post("/new", async function (req, res) {
  const { bonus1, bonus2, reroll } = req.body;

  const bonus1Value = getBonus(req.user.player, bonus1) || 0;
  const bonus2Value = getBonus(req.user.player, bonus2) || 0;
  const rerollValue = getBonus(req.user.player, reroll) || -1;
  const bonusesValues = bonus1Value + bonus2Value;

  let result1 = Math.ceil(Math.random() * 20);
  let result2 = Math.ceil(Math.random() * 20);
  const hasReroll = result1 <= rerollValue;

  rolls.push({
    time: Date.now(),
    name: req.user.player.name,
    result: hasReroll ? result1 : result2,
    resultValue: hasReroll ? result1 + bonusesValues : result2 + bonusesValues,
    bonuses: {
      bonus1: { name: bonus1, value: bonus1Value },
      bonus2: { name: bonus2, value: bonus2Value },
      reroll: { name: reroll, value: rerollValue },
    },
    hasReroll,
    result_before_reroll: hasReroll && result1,
  });
  rolls = rolls.slice(-STORE_LAST);
  res.sendStatus(200);
});
module.exports = app;
