const frank = require("./frank.json");
const nircosia = require("./nircosia.json");
const zango = require("./zango.json");
const players = { frank, nircosia, zango };

function get_player(name) {
    return Object.values(players).find(x => x.nom.includes(name));
}

module.exports = {
    players,
    get_player
};
