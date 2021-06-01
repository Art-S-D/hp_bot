import { IPlayer } from "mongo";

export type Stat = "corps" | "esprit" | "coeur" | "magie";
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

export type Reroll =
    | Stat
    | Competence
    | "astronomie"
    | "botanique"
    | "dcfm"
    | "enchantement"
    | "histoire"
    | "metamorphose"
    | "potions"
    | "vol";

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

export interface IDiceRollArgs {
    player: IPlayer;
    stat: Stat;
    comp: Competence;
    reroll: Reroll | undefined;
    difficulty: number | undefined;
}

export default function diceRoll({ player, stat, comp, reroll = REROLLS[stat][comp], difficulty = 15 }: IDiceRollArgs) {
    const statVal: number = player.getStat(stat) ?? 0;
    const compVal: number = player.getStat(comp) ?? 0;
    const rerollType: number = (!!reroll && player.getStat(reroll)) || 0;

    const score: number = Math.ceil(Math.random() * 20);
    const computedScore = score + statVal + compVal;

    const rerollVal: number | null = score <= rerollType ? Math.ceil(Math.random() * 20) : null;

    let msg = `${stat} + ${comp}${reroll ? ` / ${reroll}` : ""} | ${difficulty}\n`; // sum up
    msg += `${score} + ${statVal} + ${compVal} ${reroll ? `/ ${rerollType}` : ""} = ${computedScore}`; // first roll

    if (rerollType && rerollVal)
        msg += `\n${rerollVal} + ${statVal} + ${compVal} ${reroll ? `/ ${rerollType}` : ""} = ${
            // reroll
            rerollVal + statVal + compVal
        }`;
    msg += `\t <@293149809387241472>${(rerollVal ?? computedScore) > difficulty ? ":white_check_mark:" : ":x:"} `; // notify game master

    return {
        score,
        reroll,
        msg,
    };
}
