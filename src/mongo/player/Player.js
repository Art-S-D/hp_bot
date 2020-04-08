const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InventoryCategory = require("./InventoryCategory");
const Card = require("./Card");

const statType = {
  type: Number,
  required: true,
};

const Player = new Schema({
  nom: { type: String, required: true, index: true, unique: true },
  stats: {
    esprit: statType,
    coeur: statType,
    corps: statType,
    magie: statType,
  },
  competences: {
    bluff: statType,
    farce: statType,
    tactique: statType,
    rumeur: statType,
    bagarre: statType,
    endurance: statType,
    perception: statType,
    precision: statType,
    decorum: statType,
    discretion: statType,
    persuasion: statType,
    romance: statType,
  },
  matieres: {
    astronomie: statType,
    botanique: statType,
    dcfm: statType,
    enchantement: statType,
    histoire: statType,
    metamorphose: statType,
    potions: statType,
    vol: statType,
  },
  inventory: [InventoryCategory],
  privateChannel: String,
});

Player.static("getStat", function (player, stat) {
  if (player.stats[stat] !== undefined) return player.stats[stat];
  if (player.competences[stat] !== undefined) return player.competences[stat];
  if (player.matieres[stat] !== undefined) return player.matieres[stat];
});

Player.static("getPlayerFromRole", async function (msg) {
  for (const r of msg.member.roles.array()) {
    const p = await this.findOne({ nom: r.name });
    if (p) return p;
  }
  return null;
});

Player.virtual("inventoryToString").get(async function () {
  const tmp = this.inventory.map(async (x) => x.asString);
  const res = await Promise.all(tmp);
  return res.join("\n");
});

Player.virtual("cards").get(function () {
  return this.inventory.find((x) => x.__t === "cards");
});

module.exports = mongoose.model("Player", Player);
