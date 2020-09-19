import { Message } from "discord.js";
import { IPlayer } from "mongo";
import { messageButton } from "../../utils/messageButton";

enum ActionWinner {
  PJ,
  PNJ,
  NA,
}
type ActionStrategy = 0 | 1 | 2; // rock paper scissors
const ActionTitles = [
  "Action 1 --- Avec quelle stratégie commencez-vous ?",
  "Action 2 --- Avec quelle stratégie continuez-vous ?",
  "Action 3 --- Avec quelle stratégie terminez-vous ?",
];

interface IEmoji {
  name: string;
  emoji: string;
}

interface IGameType extends IEmoji {
  actions: IEmoji[];
}
const GameTypes: IGameType[] = [
  {
    name: "echecs",
    emoji: "echecsorcier",
    actions: [
      { name: "Attaque", emoji: "🧱" },
      { name: "Défense", emoji: "📜" },
      { name: "Yolo", emoji: "✂️" },
    ],
  },
  {
    name: "bavboules",
    emoji: "🏀",
    actions: [
      { name: "Distraction", emoji: "🧱" },
      { name: "Concentration", emoji: "📜" },
      { name: "Temporisation", emoji: "✂️" },
    ],
  },
  {
    name: "cartes",
    emoji: "🃏",
    actions: [
      { name: "Acharnement", emoji: "🧱" },
      { name: "Maîtrise", emoji: "📜" },
      { name: "Risque", emoji: "✂️" },
    ],
  },
];

interface IEnemyType extends IEmoji {
  bonus: number;
}
const EnemyTypes: IEnemyType[] = [
  { name: "nul", emoji: "🇳", bonus: -2 },
  { name: "moyen", emoji: "🇲", bonus: 0 },
  { name: "bon", emoji: "🇧", bonus: 2 },
  { name: "excellent", emoji: "🇪", bonus: 4 },
  { name: "génie", emoji: "🇬", bonus: 6 },
];

export class Jeu {
  message: Message;
  player: IPlayer;

  // it is a reply to this.message
  gameMessage: Message | null = null;
  // just a description of the type of game/enemy
  gameDescription: string = "";

  gameType: IGameType = GameTypes[0];
  enemyLevel: IEnemyType = EnemyTypes[0];

  results: ActionWinner[] = [ActionWinner.NA, ActionWinner.NA, ActionWinner.NA];

  constructor(msg: Message, player: IPlayer) {
    this.message = msg;
    this.player = player;
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
    this.gameMessage = await this.message.reply(
      `A quel jeu jouez vous ?\n(${Object.values(GameTypes).map((x) => x.name)})`
    );
    this.gameType = await this.button<IGameType>(GameTypes);
    this.gameMessage.edit(
      `<@${this.message.author.id}> Vous jouez aux ${this.gameType.name}\n
Quel est le niveau de l'adversaire ?\n(${EnemyTypes.map((x) => x.name)})`
    );

    this.enemyLevel = await this.button<IEnemyType>(EnemyTypes);
    this.gameDescription = `<@${this.message.author.id}> Vous jouez aux ${this.gameType.name} contre un adversaire ${this.enemyLevel.name}`;
    this.gameMessage.edit(this.gameDescription);

    this.startActions();
  }

  // [ACTIONS]

  getPlayerBonus(): number {
    if (this.gameType.name === "echecs") return this.player.competences.tactique;
    if (this.gameType.name === "bavboules") return this.player.competences.precision;
    if (this.gameType.name === "cartes") return this.player.competences.bluff;
    return 0;
  }

  getPnjBonus(): number {
    return this.enemyLevel.bonus + this.getPlayerBonus() + Math.floor(Math.random() * 5) - 2;
  }

  resolveAction(playerStrat: ActionStrategy, pnjStrat: ActionStrategy): ActionWinner {
    const playerBonus = this.getPlayerBonus() + ((playerStrat + 1) % 3 === pnjStrat ? 3 : 0);
    const pnjBonus = this.getPnjBonus() + ((pnjStrat + 1) % 3 === playerStrat ? 3 : 0);
    if (playerBonus >= pnjBonus) return ActionWinner.PJ;
    else return ActionWinner.PNJ;
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

    const winner: ActionWinner = this.resolveAction(playerStrat, pnjStrat);
    this.results[actionNumber] = winner;

    this.gameDescription = `${this.gameDescription}\n\nVous choisissez ${this.gameType.actions[playerStrat].name}${
      this.gameType.actions[playerStrat].emoji
    } et votre adversaire choisit ${this.gameType.actions[pnjStrat].name}${this.gameType.actions[pnjStrat].emoji}
${winner === ActionWinner.PJ ? "Vous gagnez!:v:" : "vous perdez :disappointed_relieved:"}\n${this.getResults()}`;
  }

  async startActions() {
    await this.action(0);
    await this.action(1);
    if (this.results[0] !== this.results[1]) await this.action(2);

    const playerWins = this.results.filter((x) => x === ActionWinner.PJ);
    const pnjWins = this.results.filter((x) => x === ActionWinner.PNJ);

    if (playerWins > pnjWins) {
      this.gameMessage?.edit(`${this.gameDescription}\n\n:v:Victoire!:v:`);
    } else {
      this.gameMessage?.edit(`${this.gameDescription}\n\n:disappointed_relieved:Défaite:disappointed_relieved:`);
    }
  }
}
