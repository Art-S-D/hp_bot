const { get_player } = require("../models/players");

function print_grimoire(player) {
  const { nom, ..._player } = player;
  let res = nom + "\n";
  for (i in _player) {
    res += i + "---\n";
    for (j in _player[i]) {
      res += j + ": " + _player[i][j] + "\n";
    }
    res += "\n";
  }
  return res;
}

function grimoire(msg) {
  const player = get_player(msg.member.nickname);
  if (player) msg.reply(print_grimoire(player));
  else msg.reply("joueur inconnu");
}

module.exports = grimoire;
