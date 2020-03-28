const hasRole = require("../../commands/utils/hasRole");
const frank = require("./frank.json");
const nircosia = require("./nircosia.json");
const zango = require("./zango.json");

const players = { frank, nircosia, zango };

function get_player(name) {
  return Object.values(players).find(x => x.nom.includes(name));
}

function getPlayerFromRole(msg) {
  if (hasRole(msg, "Frank Fizeman")) return frank;
  if (hasRole(msg, "Zango le Deuzo")) return zango;
  if (hasRole(msg, "Nircosia Verpey")) return nircosia;
}

function get_stat(player, stat) {
  if (player.stats[stat] !== undefined) return player.stats[stat];
  if (player.competences[stat] !== undefined) return player.competences[stat];
  if (player.matieres[stat] !== undefined) return player.matieres[stat];
}

module.exports = {
  players,
  get_player,
  get_stat,
  getPlayerFromRole
};
