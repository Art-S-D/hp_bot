import { ApplicationCommandData } from "discord.js";

import client from "../../client";
import { Player } from "mongo";
import diceRoll, { Stat, Competence } from "./diceRoll";

const commandData: ApplicationCommandData = {
    name: "d",
    description: "Lancer un dé",
    options: [
        {
            type: "STRING",
            name: "stat",
            description: "Compétence principale",
            required: true,
            choices: [
                { name: "corps", value: "corps" },
                { name: "esprit", value: "esprit" },
                { name: "coeur", value: "coeur" },
            ],
        },
        {
            type: "STRING",
            name: "compétence",
            description: "Compétence secondaire",
            required: true,
            choices: [
                { name: "bluff", value: "bluff" },
                { name: "farce", value: "farce" },
                { name: "tactique", value: "tactique" },
                { name: "rumeur", value: "rumeur" },
                { name: "bagarre", value: "bagarre" },
                { name: "endurance", value: "endurance" },
                { name: "perception", value: "perception" },
                { name: "precision", value: "precision" },
                { name: "decorum", value: "decorum" },
                { name: "discretion", value: "discretion" },
                { name: "persuasion", value: "persuasion" },
                { name: "romance", value: "romance" },
            ],
        },
        // {
        //     type: "STRING",
        //     name: "relance",
        //     description: "Relance",
        //     required: false,
        //     choices: [
        //         { name: "corps", value: "corps" },
        //         { name: "esprit", value: "esprit" },
        //         { name: "coeur", value: "coeur" },
        //     ],
        // },
    ],
};

client.once("ready", () => {
    client.application?.commands?.create(commandData);
});
client.on("interaction", async (interaction) => {
    if (interaction.isCommand() && interaction.commandName === "d") {
        const player = await Player.getPlayerFromRole(interaction);

        // cast is fine here since the discord slash command should check the args correctly
        let { msg } = diceRoll(
            player,
            interaction.options[0].value as Stat,
            interaction.options[1].value as Competence
        );
        interaction.reply(msg);
    }
});
