const { players } = require("./players");
const { Player, connection } = require("..");

module.exports = {
  async up(db, client) {
    console.log(players);
    for (const p in players) {
      await Player.create(players[p]);
      console.log("adding", p);
    }
  },

  async down(db, client) {}
};
