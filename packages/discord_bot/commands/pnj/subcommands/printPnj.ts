import { MessageAttachment, Message } from "discord.js";
import { IPnj } from "mongo";

export default function printPnj(msg: Message, pnj: IPnj) {
  const reply: string = `${pnj.description}`;

  if (pnj.picture) {
    // const pic = new MessageAttachment(pnj.picture, {});
    msg.channel.send(reply, { files: [pnj.picture] });
  } else msg.reply(reply);
}
