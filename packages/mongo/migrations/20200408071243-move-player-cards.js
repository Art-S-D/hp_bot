const { players } = require("./players");
const { Player, connection } = require("..");

module.exports = {
  async up(db, client) {
    for (const p of await Player.find({})) {
      p.inventory.push({
        name: "Cards",
        items: [],
        __t: "cards",
      });
      p.markModified("inventory");
      await p.save();
    }
  },

  async down(db, client) {},
};
