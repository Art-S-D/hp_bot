import { MessageAttachment, Message } from "discord.js";
import { IPnj } from "mongo";

export default function printPnj(msg: Message, pnj: IPnj) {
    const reply: string = `${pnj.description} ${pnj.picture || ""}`;

    // if (pnj.picture) {
    //      const pic = new MessageAttachment(pnj.picture, {});
    //     msg.channel.send(reply);
    // } else
    msg.reply(reply);
}
