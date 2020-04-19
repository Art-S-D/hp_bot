const express = require("express");
const session = require("cookie-session");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { Player, Card } = require("mongo");
const env = require("./env");
const passport = require("passport");
require("./passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public"));
app.use(session({ secret: "poudlard" }));
app.use(cookieParser("poudlard"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  function (req, res, next) {
    console.log(`login atempt <${req.body.username}> <${req.body.password}>`);
    next();
  },
  passport.authenticate("local", {
    successRedirect: `${env.WEBSITE_URL}/success`,
    failureRedirect: `${env.WEBSITE_URL}/error`,
    failureFlash: false,
  })
);

app.use(function (req, res, next) {
  if (req.user) next();
  else res.status(401).end();
});

app.get("/player", async function (req, res) {
  res.status(200).json(req.user);
});

app.get("/cards", async function (req, res) {
  let cards = req.user.cards.items;

  for (let i = 0; i < cards.length; i++) {
    cards[i] = await Card.findById(cards[i]);
  }
  res.status(200).json(cards);
});

app.post("/add-card", async function (req, res) {
  if (!req.body || (!req.body.name && !req.body.category))
    return res.status(400).end();
  const quantity = req.body.quantity || 1;
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    if (req.body.name)
      cards.push((await Card.findOne({ name: req.body.name }))._id);
    else if (req.body.category) {
      const count = await Card.find({
        category: req.body.category,
      }).countDocuments();
      let card = await Card.findOne({ category: req.body.category }).skip(
        Math.floor(Math.random() * count)
      );
      cards.push(card._id);
    } else {
      let getQuery = null;
      let rand = Math.random();
      if (rand < 0.01) getQuery = () => Card.findOne({ category: "L" });
      else if (rand < 0.1) getQuery = () => Card.findOne({ category: "R" });
      else getQuery = () => Card.findOne({ category: "C" });

      cards.push(
        (
          await getQuery().skip(
            Math.floor(Math.random() * (await getQuery().countDocuments()))
          )
        )._id
      );
    }
  }
  console.log(`adding cards ${cards} to player ${req.user.name}`);
  req.user.cards.items = req.user.cards.items.concat(cards);
  req.user.markModified("inventory");
  await req.user.save();
  res.status(200).redirect("/cards");
});

app.post("/remove-card", async function (req, res) {
  if (!req.body || !req.body.card)
    return res.status(400).send("missing request body");

  let removed = false;
  req.user.cards.items = req.user.cards.items.filter((x) => {
    if (!removed && x === req.body.card) {
      removed = true;
      return false;
    }
    return true;
  });
  if (!removed) return res.status(400).send("you don't possess this card");
  req.user.markModified("cards");
  await req.user.save();

  console.log(`${req.user.name} removed a card`);
  return res.status(200).end();
});

app.use("/rolls", require("./roll"));

app.listen(8080);
