const express = require("express");
const { Pnj } = require("mongo");
const app = express.Router();

const STORE_AMOUNT = 5;
let pnjs = [];

app.get("/latest", async function (req, res) {
  res.status(200).json(pnjs);
});

app.post("/new", async function (req, res) {
  //if (!req.user.isAdmin) return res.sendStatus(401);
  let p = await Pnj.getFromName(req.body.name);
  if (!p) return res.status(400).redirect("/pnjs/error");
  p = p.toObject();
  p.fullname = req.body.name;

  pnjs = pnjs.filter(
    (x) => x.name !== p.name || x.house !== p.house || x.year !== p.year
  );
  pnjs.unshift(p);
  pnjs = pnjs.slice(STORE_AMOUNT);

  res.status(200).redirect("/pnjs/success");
});

module.exports = app;
