const stats = ["esprit", "coeur", "corps"];
const perks = [
  "bluff",
  "farce",
  "tactique",
  "rumeur",
  "bagarre",
  "endurance",
  "perception",
  "precision",
  "decorum",
  "discretion",
  "persuasion",
  "romance",
];

const opposite = {
  esprit: {
    bluff: "coeur",
    farce: "coeur",
    tactique: "coeur",
    rumeur: "coeur",

    bagarre: "corps",
    endurance: "corps",
    perception: "corps",
    precision: "corps",
  },
  coeur: {
    bluff: "esprit",
    farce: "esprit",
    tactique: "esprit",
    rumeur: "esprit",

    decorum: "corps",
    discretion: "corps",
    persuasion: "corps",
    romance: "corps",
  },
  corps: {
    decorum: "coeur",
    discretion: "coeur",
    persuasion: "coeur",
    romance: "coeur",

    bagarre: "esprit",
    endurance: "esprit",
    perception: "esprit",
    precision: "esprit",
  },
};

function getAutoReroll(stat, competence) {
  return opposite[stat] && opposite[stat][competence];
}

function matchAutoReroll(ast) {
  if (!(ast && ast["+"] && ast["+"].left.word && ast["+"].right.word))
    return null;
  if (perks.includes(ast["+"].left.word) && stats.includes(ast["+"].right.word))
    return { perk: ast["+"].left.word, stat: ast["+"].right.word };
  if (stats.includes(ast["+"].left.word) && perks.includes(ast["+"].right.word))
    return { perk: ast["+"].right.word, stat: ast["+"].left.word };
  return null;
}

function autoReroll(ast) {
  const reroll = matchAutoReroll(ast);
  if (reroll === null) return null;
  const { perk, stat } = reroll;
  return opposite[stat][perk];
}

module.exports = { autoReroll, matchAutoReroll, getAutoReroll };
