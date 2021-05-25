import { ApplicationCommandData, CommandInteraction } from "discord.js";

import client from "../../client";
import { Player } from "mongo";
import diceRoll, { Stat, Competence, Reroll } from "./diceRoll";

const commandData: ApplicationCommandData = {
    name: "d",
    description: "Lancer un dé",
    options: [
        {
            type: "STRING",
            name: "caractéristiques",
            description: "Compétence principale",
            required: true,
            choices: [
                { name: "corps", value: "corps" },
                { name: "esprit", value: "esprit" },
                { name: "coeur", value: "coeur" },

                { name: "magie", value: "magie" },
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
        {
            type: "STRING",
            name: "relance",
            description: "Relance",
            required: false,
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

                { name: "corps", value: "corps" },
                { name: "esprit", value: "esprit" },
                { name: "coeur", value: "coeur" },
                { name: "magie", value: "magie" },

                { name: "astronomie", value: "astronomie" },
                { name: "botanique", value: "botanique" },
                { name: "dcfm", value: "dcfm" },
                { name: "enchantement", value: "enchantement" },
                { name: "histoire", value: "histoire" },
                { name: "metamorphose", value: "metamorphose" },
                { name: "potions", value: "potions" },
                { name: "vol", value: "vol" },
            ],
        },

        // maybe have a choice between 10 15 20 25
        { type: "INTEGER", name: "difficulté", description: "difficulté", required: false },
    ],
};

client.once("ready", () => {
    client.application?.commands?.create(commandData);
});
client.on("interaction", async (interaction) => {
    if (interaction.isCommand() && interaction.commandName === "d") {
        const player = await Player.getPlayerFromRole(interaction);

        const getOption = (name: string): number | string | boolean | undefined =>
            (interaction as CommandInteraction).options.find((option) => option.name === name)?.value;

        // cast is fine here since the discord slash command should check the args correctly
        let { msg } = diceRoll({
            player,
            stat: getOption("caractéristiques") as Stat,
            comp: getOption("compétence") as Competence,
            reroll: getOption("relance") as Reroll | undefined,
            difficulty: getOption("difficulté") as number | undefined,
        });
        interaction.reply(msg);
    }
});
