const { Player, connection } = require("..");

module.exports = {
  async up(db, client) {
    await Player.cleanIndexes();
    await Player.ensureIndexes();
    await db.collection("players").updateMany({}, { $rename: { nom: "name" } });
  },

  async down(db, client) {},
};
