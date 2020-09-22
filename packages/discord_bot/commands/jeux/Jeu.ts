import { Message } from "discord.js";
import { IPlayer } from "mongo";
import { messageButton } from "../../utils/messageButton";

enum ActionWinner {
    PJ,
    PNJ,
    NA,
}
type ActionStrategy = 0 | 1 | 2; // rock paper scissors

interface IEmoji {
    name: string;
    emoji: string;
}

interface IGameType extends IEmoji {
    actions: IEmoji[];
    enemyCompetence: object;
}
interface IEnemyType extends IEmoji {
    bonus: number;
}

import data = require("./data.json");
const {
    ActionTitles,
    GameTypes,
    EnemyTypes,
    Bets,
    EnemyBonusDescription,
    Progression,
    ChoiceDescription,
}: {
    ActionTitles: string[];
    GameTypes: IGameType[];
    EnemyTypes: IEnemyType[];
    Bets: IEmoji[];
    EnemyBonusDescription: object;
    Progression: object;
    ChoiceDescription: object;
} = data;

export class Jeu {
    message: Message;
    player: IPlayer;

    // it is a reply to this.message
    gameMessage: Message | null = null;

    // just a description of the type of game/enemy
    gameDescription: string = "";

    gameType: IGameType = GameTypes[0];

    enemyLevel: IEnemyType = EnemyTypes[0];
    enemyBonus: number = 0;

    results: ActionWinner[] = [ActionWinner.NA, ActionWinner.NA, ActionWinner.NA];

    constructor(msg: Message, player: IPlayer) {
        this.message = msg;
        this.player = player;
        this.enemyBonus = Math.floor(Math.random() * 5) - 2;
    }

    async button<T extends IEmoji>(emojis: T[]): Promise<T> {
        const emo = await messageButton(
            this.gameMessage as Message,
            emojis.map((x) => x.emoji),
            [this.message.author.id],
            true
        );
        if (!emo) throw new Error("jeux: missing answer");
        const res = emojis.find((x) => x.emoji === emo);
        if (!res) throw new Error(`jeux: wrong emoji ${emo}`);
        return res as T;
    }

    // [GAME START]

    async start() {
        {
            // game
            this.gameMessage = await this.message.reply(
                `A quel jeu jouez vous ?\n(${Object.values(GameTypes).map((x) => x.name)})`
            );
            this.gameType = await this.button<IGameType>(GameTypes);
        }

        // {
        //     //bet
        //     this.gameMessage.edit(
        //         `<@${this.message.author.id}> Vous jouez aux ${
        //             this.gameType.name
        //         }\n\nQue voulez vous parier ?\n(${Bets.map((x) => x.name)})`
        //     );
        //     this.cardBet = (await this.button<IEmoji>(Bets)).name;
        // }

        {
            //enemy
            this.gameMessage.edit(
                `<@${this.message.author.id}> Vous jouez aux ${this.gameType.name} ${
                    this.gameType.emoji
                }\n\nQuel est le niveau de l'adversaire ?\n(${EnemyTypes.map((x) => x.name)})`
            );
            this.enemyLevel = await this.button<IEnemyType>(EnemyTypes);
        }

        {
            // edit description
            this.gameDescription = `<@${this.message.author.id}> Vous jouez aux ${this.gameType.name} ${
                this.gameType.emoji
            } contre un adversaire ${this.enemyLevel.name}${this.enemyLevel.emoji}\n${
                EnemyBonusDescription[this.gameType.name][this.enemyBonus]
            }`;
            this.gameMessage.edit(this.gameDescription);
        }

        this.startActions();
    }

    // [ACTIONS]

    getPlayerBonus(): number {
        if (this.gameType.name === "echecs") return this.player.competences.tactique + this.player.jeux.echecs;
        if (this.gameType.name === "bavboules") return this.player.competences.precision + this.player.jeux.bavboules;
        if (this.gameType.name === "cartes") return this.player.competences.bluff + this.player.jeux.cartes;
        console.warn("unknown bonus ", this.gameType.name);
        return 0;
    }

    resolveAction(playerStrat: ActionStrategy, pnjStrat: ActionStrategy): [ActionWinner, string] {
        const _playerBonus = this.getPlayerBonus();
        const playerBonus = _playerBonus + ((playerStrat + 1) % 3 === pnjStrat ? 3 : 0);
        const pnjBonus = this.enemyBonus + ((pnjStrat + 1) % 3 === playerStrat ? 3 : 0);

        const combatDescription = `[${_playerBonus}(stats)+${
            (playerStrat + 1) % 3 === pnjStrat ? 3 : 0
        }(strat)=${playerBonus}; ${this.enemyLevel.bonus}(niveau)+${this.enemyBonus - this.enemyLevel.bonus}(random)+${
            (pnjStrat + 1) % 3 === playerStrat ? 3 : 0
        }(strat)=${pnjBonus}]`;

        if (playerBonus >= pnjBonus) return [ActionWinner.PJ, combatDescription];
        else return [ActionWinner.PNJ, combatDescription];
    }

    getResults(): string {
        return this.results
            .map((res) => {
                if (res === ActionWinner.PJ) return "o";
                else if (res === ActionWinner.PNJ) return "x";
                else return "-";
            })
            .join("");
    }

    async action(actionNumber: number) {
        this.gameMessage?.edit(
            `${this.gameDescription}\n\n${ActionTitles[actionNumber]}\n(${this.gameType.actions.map((a) => a.name)})`
        );

        const playerEmoji: IEmoji = await this.button(this.gameType.actions);
        const playerStrat: ActionStrategy = this.gameType.actions.findIndex(
            (x) => x.emoji === playerEmoji.emoji
        ) as ActionStrategy;
        const pnjStrat: ActionStrategy = Math.floor(Math.random() * 3) as ActionStrategy;

        const [winner, combatResult]: [ActionWinner, string] = this.resolveAction(playerStrat, pnjStrat);
        this.results[actionNumber] = winner;

        {
            //set description
            // this.gameDescription = `${this.gameDescription}\n\nVous choisissez ${
            //     this.gameType.actions[playerStrat].name
            // }${this.gameType.actions[playerStrat].emoji} et votre adversaire choisit ${
            //     this.gameType.actions[pnjStrat].name
            // }${this.gameType.actions[pnjStrat].emoji} ${combatResult}\n${
            //     ChoiceDescription[this.gameType.actions[playerStrat].name][this.gameType.actions[pnjStrat].name]
            // }\n${Progression[this.getResults()]} ${winner === ActionWinner.PJ ? ":smile:" : ":disappointed_relieved:"}`;

            this.gameDescription = `${this.gameDescription}\n\n${this.gameType.actions[playerStrat].emoji}vs${
                this.gameType.actions[pnjStrat].emoji
            }\n${ChoiceDescription[this.gameType.actions[playerStrat].name][this.gameType.actions[pnjStrat].name]}\n${
                Progression[this.getResults()]
            } ${winner === ActionWinner.PJ ? ":v:" : ":disappointed_relieved:"}`;
        }
    }

    async startActions() {
        await this.action(0);
        await this.action(1);
        await this.action(2);

        const playerWins = this.results.filter((x) => x === ActionWinner.PJ).length;
        const pnjWins = this.results.filter((x) => x === ActionWinner.PNJ).length;

        if (playerWins > pnjWins) {
            this.gameMessage?.edit(`${this.gameDescription}\n\n:v:Victoire!:v:`);
        } else {
            this.gameMessage?.edit(`${this.gameDescription}\n\n:disappointed_relieved:Défaite:disappointed_relieved:`);
        }
    }
}
