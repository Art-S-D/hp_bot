const { Attachment } = require("discord.js");
const { Pnj } = require("mongo");

function printPnj(msg, pnj) {
  const reply = `${pnj.description}`;

  if (pnj.picture) {
    const pic = new Attachment(pnj.picture);
    msg.channel.send(reply, pic);
  } else msg.reply(reply);
}

module.exports = printPnj;
