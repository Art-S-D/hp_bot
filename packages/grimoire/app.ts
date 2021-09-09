import express from "express";
import pug from "pug";

const app = express();
const grimoire = pug.compileFile("grimoire.pug");

const frank = {
    _id: "5e8896a25e3fd02635e5d4d6",
    nom: "Frank Fizeman",
    name: "Frank Fizeman",
    stats: {
        esprit: 3,
        coeur: 2,
        corps: 2,
        magie: 3,
    },
    competences: {
        bluff: 2,
        farce: 2,
        tactique: 1,
        rumeur: 0,
        bagarre: 0,
        endurance: 1,
        perception: 2,
        precision: 2,
        decorum: 0,
        discretion: 4,
        persuasion: 0,
        romance: 0,
    },
    matieres: {
        astronomie: 0,
        botanique: 0,
        dcfm: 4,
        enchantement: 6,
        histoire: -2,
        metamorphose: 0,
        potions: 0,
        vol: 0,
    },
    privateChannel: "662286700634046469",
};

app.get("/", async (req, res) => {
    const grim = grimoire(frank);
    res.status(200).send(grim);
});

app.listen(8080, () => console.log("app listening on http://localhost:8080"));
