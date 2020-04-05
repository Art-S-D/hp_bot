const Discord = require("discord.js");
const client = new Discord.Client();
const { Player, connection } = require("mongo");
const isAuthorized = require("./utils/isAuthorized");

const commands = require("./commands");

function runResponses(msg) {
  if (msg.content.toLowerCase().includes("nircosia"))
    msg.reply("son nom c'est nico");
  if (msg.content.toLowerCase().includes("balkany")) msg.reply("balkavoue");
  if (msg.content.toLowerCase().includes("malkany")) msg.reply("malkavoue");
}

async function runCommand(msg) {
  if (msg.content[0] !== "!") return;
  const command = Object.keys(commands).find((x) =>
    msg.content.substring(1).startsWith(x)
  );
  if (command) {
    if (process.argv.includes("log")) console.log(msg.content);

    try {
      if (commands[command].critical && !isAuthorized(msg))
        msg.reply("Unauthorized");
      else {
        const player = await Player.getPlayerFromRole(msg);
        await commands[command](msg, player);
      }
    } catch (e) {
      msg.reply(e.message || e);
      console.error(e);
    }
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  runResponses(msg);
  await runCommand(msg);
});

client.on("error", (e) => {
  if (e.error.code === "EAI_AGAIN") {
    console.error(e, "connection error, reconnecting");
    client.connect();
  }
});

client.login("NjY4NDI3NDg1MzY4NjgwNDUw.XiRH2Q.GCVmxJ9K8ash5GXox8TMX70zfEg");
