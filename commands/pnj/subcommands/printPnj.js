const { Attachment } = require("discord.js");
const { Pnj } = require("../../../models");

function printPnj(msg, pnj) {
  const ageDesc =
    pnj.year === 0
      ? "il a votre âge"
      : `il a ${Math.abs(pnj.year)} ans de ${
          pnj.year >= 0 ? "plus" : "moins"
        } que vous`;
  const reply = `${pnj.name} ${pnj.description}, ${ageDesc}.`;

  if (pnj.picture) {
    const pic = new Attachment(pnj.picture);
    msg.channel.send(reply, pic);
  } else msg.reply(reply);
}

module.exports = printPnj;
