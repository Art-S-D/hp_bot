import { Message, MessageAttachment, ApplicationCommandData, MessageEmbed } from "discord.js";
import { Player, IPlayer } from "mongo";
import client from "../client";
import generateGrimoire from "grimoire";
import nodeHtmlToImage from "node-html-to-image";

const commandData: ApplicationCommandData = {
    name: "grimoire",
    description: "Afficher les compétences du joueur",
};

async function getAttachment(player: IPlayer | null): Promise<MessageAttachment> {
    if (!player) throw "joueur inconnu";

    const grim = generateGrimoire(player);
    const buffer = (await nodeHtmlToImage({
        html: grim,
        puppeteerArgs: {
            args: ["--no-sandbox"],
        },
    })) as Buffer;

    return new MessageAttachment(buffer, `${player.name}.png`);
}

client.once("ready", () => {
    client.application?.commands?.create(commandData);
});
client.on("interaction", async (interaction) => {
    if (interaction.isCommand() && interaction.commandName === "grimoire") {
        const player = await Player.getPlayerFromRole(interaction);

        const attachment = await getAttachment(player);

        await interaction.reply("", {
            embeds: [new MessageEmbed({ title: `Grimoire-${player.name}`, files: [attachment] })],
        });
    }
});

export async function grimoire(msg: Message, player: IPlayer | null) {
    const attachment = await getAttachment(player);
    msg.reply(attachment);
}
