const { client, MessageAttachment } = require("discord.js");
const { connection, Pnj } = require("../../models");
const { createModel } = require("mongoose-gridfs");

const Attachment = createModel();

async function findStudent(name) {
  const student = await Pnj.find({ name });
}

async function pnj(msg) {
  const name = msg.content.split(" ")[1];
  if (!name) {
    msg.reply("et le nom fdp ?");
    return;
  }
  const student = await findStudent(name);
  if (!student) {
    msg.reply("Aucun pnj ne correspond à la description");
  } else {
    msg.reply(`${name} ${student.description}`);

    const stream = Attachment.read({ _id: student.picture });
    const pic = new MessageAttachment(stream, "pic.png");
    message.channel.send(pic);
  }
}

module.exports = pnj;
