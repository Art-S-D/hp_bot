const { Card } = require("..");

const cards = require("./cards/cards");

module.exports = {
  async up(db, client) {
    for (const c of cards) {
      await Card.create(c);
    }
  },

  async down(db, client) {},
};
