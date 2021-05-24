import { IPlayer } from "mongo";

export type Stat = "corps" | "esprit" | "coeur";
export type Competence =
    | "bluff"
    | "farce"
    | "tactique"
    | "rumeur"
    | "bagarre"
    | "endurance"
    | "perception"
    | "precision"
    | "decorum"
    | "discretion"
    | "persuasion"
    | "romance";

export type DiceRollResult = {
    score: number;
    reroll?: number;
    msg: string;
};

const REROLLS = {
    esprit: {
        bluff: "coeur",
        farce: "coeur",
        tactique: "coeur",
        rumeur: "coeur",

        bagarre: "corps",
        endurance: "corps",
        perception: "corps",
        precision: "corps",
    },
    coeur: {
        bluff: "esprit",
        farce: "esprit",
        tactique: "esprit",
        rumeur: "esprit",

        decorum: "corps",
        discretion: "corps",
        persuasion: "corps",
        romance: "corps",
    },
    corps: {
        bagarre: "esprit",
        endurance: "esprit",
        perception: "esprit",
        precision: "esprit",

        decorum: "coeur",
        discretion: "coeur",
        persuasion: "coeur",
        romance: "coeur",
    },
};

export default function diceRoll(player: IPlayer, stat: Stat, comp: Competence) {
    const statVal: number = player.getStat(stat) ?? 0;
    const compVal: number = player.getStat(comp) ?? 0;
    const rerollType: string | null = REROLLS[stat][comp] || null;
    const rerollVal: number = (!!rerollType && player.getStat(rerollType)) || 0;
    const score: number = Math.ceil(Math.random() * 20);
    const reroll: number | null = score <= rerollVal ? Math.ceil(Math.random() * 20) : null;

    let msg = `${stat} + ${comp} / ${rerollType || ""}\n`;
    msg += `${score} + ${statVal} + ${compVal} ${rerollType && `/ ${rerollVal}`} = ${score}`;

    if (rerollType && reroll)
        msg += `\n${score} + ${statVal} + ${compVal} ${rerollType && `/ ${rerollVal}`} = ${reroll}`;
    msg += `\t <@293149809387241472>${(reroll ?? score) >= 15 ? ":white_check_mark:" : ":x:"} `;

    return {
        score,
        reroll,
        msg,
    };
}
