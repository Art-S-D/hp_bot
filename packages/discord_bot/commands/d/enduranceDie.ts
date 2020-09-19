import { Message, User, EmojiResolvable } from "discord.js";
import { IPlayer } from "mongo";
import { messageButton } from "../../utils/messageButton";

import { d20 } from "./index";
import { Id20 } from "./types";

const enduranceRollEmojis = ["d20", "d15", "d10"];

export function isLearningRoll({ bonus1, bonus2, reroll }: Id20): boolean {
  return (
    (bonus1 === "esprit" && bonus2 === "magie") ||
    (bonus1 === "magie" && bonus2 === "esprit")
  );
}

export async function addEnduranceRerollReactions(
  msg: Message,
  player: IPlayer,
  originalMessage: Message
) {
  const reaction = await messageButton(msg, enduranceRollEmojis, [
    originalMessage.author.id,
  ]);

  let diff = 0;
  if (reaction === "d20") diff = 20;
  else if (reaction === "d15") diff = 15;
  else if (reaction === "d10") diff = 10;
  else return;

  if (diff) {
    originalMessage.reply(
      `jet d'endurance! \t (!d + endurance + magie / esprit | ${diff})`
    );
    const [_response, rollResult] = await d20(originalMessage, player, {
      bonus1: "endurance",
      bonus2: "esprit",
      reroll: "corps",
      diff,
    });
    if (diff == 10 && rollResult < 10)
      msg.reply("Oh non, vous être trop fatigué 😴");
  }
  // await msg.reactions.removeAll();
}
