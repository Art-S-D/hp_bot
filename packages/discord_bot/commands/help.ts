import { Message } from "discord.js";

export function help(msg: Message) {
  msg.reply(`
    !grimoire

    !merci

    !not_cool

    !no

    !pnj:
        !pnj <nom>
        !pnj add <nom> <description> *et une image jointe au message*
        !pnj remove <nom>
        !pnj list
        !pnj update <nom> set name <nom>*ou* year <nombre>*ou* description <description>
            *et une image jointe au message si besoin*
            *mettre la description à la fin sinon ça bug :)*

    !d:
        !d + stat1 + stat2 / relance | difficulté

    faut pas oublier de dire stp et merci au bot :)`);
}
