import { Message, Guild } from "discord.js";
import serverId = require("../serverId.json");

export default function isAuthorized(msg: Message): boolean {
  return process.argv.includes("unsafe") || (<Guild>msg.guild).id === serverId;
}
