import { Client, Intents } from "discord.js";

export default new Client({
    intents: new Intents([Intents.NON_PRIVILEGED]),
});
