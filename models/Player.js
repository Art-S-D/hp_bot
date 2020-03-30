const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hasRole = require("./utils/hasRole");

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
    histoire: -statType,
    metamorphose: statType,
    potions: statType,
    vol: statType
  },
  cards: [{ type: "ObjectId", ref: "Card" }]
});

Player.virtual("getStat", function(stat) {
  if (this.stats[stat] !== undefined) return this.stats[stat];
  if (this.competences[stat] !== undefined) return this.competences[stat];
  if (this.matieres[stat] !== undefined) return this.matieres[stat];
});

Player.static("getPlayerFromRole", function(msg) {
  for (const r of msg.member.roles) {
    const player = this.findOne({ name: r });
    if (player) return player;
  }
  return null;
});

module.exports = mongoose.model("Player", Player);
