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

app.post("/new", async function (req, res) {
  const { bonusStat, bonusCompetence, reroll } = req.body;

  const bonusStatValue = req.user.player.stats[bonusStat] || 0;
  const bonusCompetenceValue =
    req.user.player.competences[bonusCompetence] || 0;
  const rerollValue = req.user.player.stats[reroll] || -1;
  const bonusesValues = (bonusCompetenceValue || 0) + (bonusStatValue || 0);

  let result1 = Math.ceil(Math.random() * 20);
  let result2 = Math.ceil(Math.random() * 20);
  const hasReroll = result1 <= rerollValue;

  rolls.push({
    time: Date.now(),
    name: req.user.player.name,
    result: hasReroll ? result1 : result2,
    resultValue: hasReroll ? result1 + bonusesValues : result2 + bonusesValues,
    bonuses: {
      bonusStat: { name: bonusStat, value: bonusStatValue },
      bonusCompetence: { name: bonusCompetence, value: bonusCompetenceValue },
      reroll: { name: reroll, value: rerollValue },
    },
    hasReroll,
    result_before_reroll: hasReroll && result1,
  });
  rolls = rolls.slice(-STORE_LAST);
  res.status(200).end();
});
module.exports = app;
