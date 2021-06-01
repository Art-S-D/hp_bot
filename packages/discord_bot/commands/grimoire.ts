import { Message, MessageAttachment, ApplicationCommandData, CommandInteraction } from "discord.js";
import { Player, IPlayer } from "mongo";
import client from "../client";
import generateGrimoire from "grimoire";
import nodeHtmlToImage from "node-html-to-image";

const commandData: ApplicationCommandData = {
    name: "grimoire",
    description: "Afficher les compétences du joueur",
};

client.once("ready", () => {
    client.application?.commands?.create(commandData);
});
client.on("interaction", async (interaction) => {
    if (interaction.isCommand() && interaction.commandName === "grimoire") {
        const player = await Player.getPlayerFromRole(interaction);

        if (!player) throw "joueur inconnu";

        const grim = generateGrimoire(player);
        const buffer = (await nodeHtmlToImage({
            html: grim,
            puppeteerArgs: {
                args: ["--no-sandbox"],
            },
        })) as Buffer;

        const attachment = new MessageAttachment(buffer, `${player.name}.png`);
        interaction.reply("", { embeds: [attachment] });
    }
});
