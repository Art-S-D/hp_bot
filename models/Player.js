const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statType = {
  type: Number,
  required: true
};

const Player = new Schema({
  nom: { type: String, required: true, index: true, unique: true },
  stats: {
    esprit: statType,
    coeur: statType,
    corps: statType,
    magie: statType
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
    romance: statType
  },
  matieres: {
    astronomie: statType,
    botanique: statType,
    dcfm: statType,
    enchantement: statType,
    histoire: statType,
    metamorphose: statType,
    potions: statType,
    vol: statType
  },
  cards: [{ type: "ObjectId", ref: "Card" }]
});

Player.static("getStat", function(player, stat) {
  if (player.stats[stat] !== undefined) return player.stats[stat];
  if (player.competences[stat] !== undefined) return player.competences[stat];
  if (player.matieres[stat] !== undefined) return player.matieres[stat];
});

Player.static("getPlayerFromRole", async function(msg) {
  for (const r of msg.member.roles.array()) {
    const p = await this.findOne({ nom: r.name });
    if (p) return p;
  }
  return null;
});

module.exports = mongoose.model("Player", Player);
