import { Message } from "discord.js";

export async function shazam(msg: Message) {
    await msg.react("🇸");
    await msg.react("🇭");
    await msg.react("🇦");
    await msg.react("🇿");
    await msg.react("🅰️");
    await msg.react("🇲");
    await msg.react("⚡");
}
