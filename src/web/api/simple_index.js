const express = require("express");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const { Player } = require("mongo");
const env = require("./env");

const app = express();

app.use(express.json());
//app.use(express.static("public"));
app.use(session({ secret: "poudlard" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/player", async function (req, res) {
  console.log("player", req.session.player);
  res.status(200).json(req.session.player);
});

app.post("/login", async function (req, res) {
  console.log("login", req.session && req.session.player && req.session.player.nom);
  req.session.player = await Player.findOne({ nom: req.body.username, password: req.body.password }).catch((e) => console.error(e));
  res.status(200).redirect(`${env.WEBSITE_URL}`);
});

app.listen(8080);
