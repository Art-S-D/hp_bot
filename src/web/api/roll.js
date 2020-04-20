const express = require("express");
const app = express.Router();

const STORE_LAST = 10;
let rolls = [];

app.get("/latest", async function (req, res) {
  /*const tmp = req.param.date
    ? rolls.filter((x) => x.date.getTime() > req.body.date)
    : rolls;*/
  const tmp = rolls.sort((a, b) => a.date - b.date);
  res.status(200).send(tmp);
});

app.post("/new", async function (req, res) {
  rolls.push({
    time: Date.now(),
    name: req.user.name,
    value: Math.ceil(Math.random() * 20),
  });
  rolls = rolls.slice(-STORE_LAST);
  res.status(200).end();
});
module.exports = app;
