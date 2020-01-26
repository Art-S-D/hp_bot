const frank = require("./frank.json");
const nircosia = require("./nircosia.json");
const zango = require("./zango.json");
const players = { frank, nircosia, zango };

function get_player(name) {
    return Object.values(players).find(x => x.nom.includes(name));
}

function get_stat(player, stat) {
    if (player.stats[stat] !== undefined) return player.stats[stat];
    if (player.competences[stat] !== undefined) return player.competences[stat];
    if (player.matieres[stat] !== undefined) returnplayer.matieres[stat];
}

module.exports = {
    players,
    get_player,
    get_stat
};
