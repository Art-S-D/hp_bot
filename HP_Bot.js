const Discord = require("discord.js");
const client = new Discord.Client();

const commands = require("./commands");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    /*setInterval(
        () => client.channels.find(x => x.name === "général").send("test"),
        100
    );*/
});

client.on("message", msg => {
    if (msg.content.toLowerCase().includes("nircosia"))
        msg.reply("son nom c'est nico");
    if (msg.content.toLowerCase().includes("balkany")) msg.reply("balkavoue");
    if (msg.content.toLowerCase().includes("malkany")) msg.reply("malkavoue");

    if (msg.content[0] !== "!") return;
    const command = Object.keys(commands).find(x =>
        msg.content.substring(1).startsWith(x)
    );
    if (command) commands[command](msg);
});

client.login("NjY4NDI3NDg1MzY4NjgwNDUw.XiRH2Q.GCVmxJ9K8ash5GXox8TMX70zfEg");
