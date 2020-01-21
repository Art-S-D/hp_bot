const parser = require("./parser.js");

const { get_player } = require("../../players");

function roll_result(msg, res, objectif, bonus) {
    msg.reply(
        `résultat: ${res}${
            bonus ? `+${bonus}=${res + bonus}` : ""
        }, attendu: ${objectif}`
    );
}

function roll(msg) {
    try {
        const {
            faces = 20,
            objectif = 15,
            bonus,
            relance,
            joueur,
            cheat = false
        } = parser.parse(msg.content);

        const player = get_player(joueur || msg.member.nickname);
        if (!player) {
            msg.resply("joueur inconnu");
            return;
        }

        const relance_val =
            player.stats[relance] ||
            player.competences[relance] ||
            player.matieres[relance];
        const bonus_val =
            (bonus &&
                bonus.reduce(
                    (accum, current) =>
                        accum +
                        (player.stats[current] ||
                            player.competences[current] ||
                            player.matieres[current] ||
                            0),
                    0
                )) ||
            0;

        if (relance && relance_val === undefined) {
            msg.reply("stat inconnue " + relance);
            return;
        }
        if (bonus && bonus_val === undefined) {
            msg.reply("stat inconnue " + bonus);
            return;
        }

        if (cheat) {
            roll_result(msg, Math.max(faces, objectif), objectif, bonus_val);
            msg.reply("success");
            msg.reply("c'est bien parce que c'est toi");
            return;
        }

        let res = Math.ceil(Math.random() * faces);
        roll_result(msg, res, objectif, bonus_val);
        if (relance_val && res <= relance_val) {
            console.log("test");
            msg.reply("relance");
            res = Math.ceil(Math.random() * faces);
            roll_result(msg, res, objectif, bonus_val);
        }

        if (res + (bonus_val || 0) < objectif) msg.reply("fail");
        else msg.reply("success");
    } catch (e) {
        console.log(e);
        msg.reply(JSON.stringify(e));
    }
    return;
}

module.exports = roll;
