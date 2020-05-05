const express = require("express");
const session = require("cookie-session");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { Player, Card } = require("mongo");
const env = require("./env");
const passport = require("passport");
const path = require("path");
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

const BUILD_PATH = path.join(__dirname, "..", "build");
//https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing
app.use(express.static(BUILD_PATH));

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: `${env.WEBSITE_URL}`,
    failureRedirect: `${env.WEBSITE_URL}`,
    failureFlash: false,
  })
);

app.post("/api/logout", function (req, res) {
  req.logout();
  res.sendStatus(200);
});

app.use(function (req, res, next) {
  if (req.user) next();
  else res.status(401).end();
});

app.get("/api/user", async function (req, res) {
  if (req.user.isAdmin) {
    if (req.query.player) {
      const player = await Player.findOne(
        { name: req.query.player },
        "-password"
      );
      req.user.player = player;
      req.login(req.user, function (err) {
        if (err) console.error(err);
        res.status(200).json({ isAdmin: true, player });
      });
    } else res.status(200).send({ isAdmin: true, player: req.user.player });
  } else res.status(200).json({ isAdmin: false, player: req.user.player });
});

app.all("/api", function (req, res, next) {
  if (!req.user.player) return res.status(400).send("No player selected");
  else next();
});

app.get("/api/cards", async function (req, res) {
  let cards = req.user.player.cards.items;

  for (let i = 0; i < cards.length; i++) {
    cards[i] = await Card.findById(cards[i]);
  }
  res.status(200).json(cards);
});

app.post("/api/add-card", async function (req, res) {
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
  req.user.player.cards.items = req.user.player.cards.items.concat(cards);
  req.user.player.markModified("inventory");
  await req.user.player.save();
  res.status(200).redirect("/cards");
});

app.post("/api/remove-card", async function (req, res) {
  if (!req.body || !req.body.card)
    return res.status(400).send("missing request body");

  let removed = false;
  req.user.player.cards.items = req.user.player.cards.items.filter((x) => {
    if (!removed && x === req.body.card) {
      removed = true;
      return false;
    }
    return true;
  });
  if (!removed) return res.status(400).send("you don't possess this card");
  req.user.player.markModified("cards");
  await req.user.player.save();

  console.log(`${req.user.player.name} removed a card`);
  return res.status(200).end();
});

app.use("/api/rolls", require("./roll"));
app.use("/api/pnjs", require("./pnjs"));

//https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing
app.get("/*", function (req, res) {
  res.sendFile(path.join(BUILD_PATH, "index.html"));
});

app.listen(8080);
