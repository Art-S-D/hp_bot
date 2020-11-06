import { Message } from "discord.js";
import { Player, IPlayer } from "mongo";
import { ICommand } from "./commands";
import {emojiFromString} from "./utils/emoji"
import commands = require("./commands");
import isAuthorized from "./utils/isAuthorized";

import client from "./client";

// not commands but more like jokes for when the message contains a certain word
function runResponses(msg: Message) {
  if (msg.content.toLowerCase().includes("nircosia"))
    msg.reply("son nom c'est nico");
  if (msg.content.toLowerCase().includes("balkany")) msg.reply("balkavoue");
  if (msg.content.toLowerCase().includes("malkany")) msg.reply("malkavoue");
  if ((msg.content.toLowerCase().includes("kate") || msg.content.toLowerCase().includes("kane")) && msg.author.id !== client?.user?.id)msg.reply("attend, on parle de Kate ou de Kane ???");
  if(msg.content.toLowerCase().includes("jasper"))msg.react(emojiFromString(msg,"onatujasper"));
  if(msg.content.toLowerCase().includes("scenario")||msg.content.toLowerCase().includes("scénario"))msg.react(emojiFromString(msg,"allons_ruiner_le_scenario"));
}

async function runCommand(msg: Message) {
  if (msg.content[0] !== "!") return;

  const _command: string | undefined = Object.keys(commands).find((x) =>
    msg.content.substring(1).startsWith(x)
  );

  if (_command) {
    const command: ICommand = commands[_command];
    if (process.argv.includes("log")) console.log(msg.content);

    if (command.critical && !isAuthorized(msg)) msg.reply("Unauthorized");
    else {
      const player: IPlayer | null = await Player.getPlayerFromRole(msg);
      await command(msg, player);
    }
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("message", async (msg: Message) => {
  try {
    runResponses(msg);
    await runCommand(msg);
  } catch (e) {
    msg.reply(e.message || e);
    console.error(e);
  }
});

client.on("error", async (e) => {
  console.error(e, "connection error, reconnecting");
  await login();
});

async function login() {
  await client
    .login("NjY4NDI3NDg1MzY4NjgwNDUw.XiRH2Q.GCVmxJ9K8ash5GXox8TMX70zfEg")
    .catch((e) => login());
}
login();
