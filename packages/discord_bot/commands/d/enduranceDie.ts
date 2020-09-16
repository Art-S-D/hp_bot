import { Message, User, EmojiResolvable } from "discord.js";
import { IPlayer } from "mongo";

import { d20 } from "./index";
import { Id20 } from "./types";
import client from "../../client";

const enduranceRollEmojis = ["d20", "d15", "d10"];

export function isLearningRoll({ bonus1, bonus2, reroll }: Id20): boolean {
  return (
    ((bonus1 === "esprit" && bonus2 === "endurance") ||
      (bonus1 === "endurance" && bonus2 === "esprit")) &&
    reroll === "corps"
  );
}

export async function addEnduranceRerollReactions(
  msg: Message,
  player: IPlayer,
  originalMessage: Message
) {
  for (const emoji of enduranceRollEmojis) {
    await msg.react(
      msg.guild?.emojis.cache.find((e) => e.name === emoji) as EmojiResolvable
    );
  }
  const reaction = await msg
    .awaitReactions(
      (reaction, user) =>
        user.id === originalMessage.author.id &&
        enduranceRollEmojis.includes(reaction.emoji.name),
      { time: 1000 * 60 * 10, max: 1 }
    )
    .catch((e) => {
      console.warn(e);
      return undefined;
    });

  let diff = 0;
  if (reaction?.first()?.emoji?.name === "d20") diff = 20;
  else if (reaction?.first()?.emoji?.name === "d15") diff = 15;
  else if (reaction?.first()?.emoji?.name === "d10") diff = 10;
  if (diff) {
    originalMessage.reply(
      `jet d'endurance! \t (!d + endurance + magie / esprit | ${diff})`
    );
    d20(originalMessage, player, {
      bonus1: "endurance",
      bonus2: "magie",
      reroll: "esprit",
      diff,
    });
  }
  await msg.reactions.removeAll();
}

// function getStored(msg: Message): Message | undefined {
//   return storedLearningRolls.find((message: Message) => msg.id === message.id);
// }

// function removeMsgFromStorage(msg: Message) {
//   storedLearningRolls = storedLearningRolls.filter((m) => m.id !== msg.id);
// }

// client.on("messageReactionAdd", function (
//   reaction: MessageReaction,
//   user: User | PartialUser
// ) {
//   const _msg = getStored(reaction.message);
//   if (!_msg) return;
//   const msg = _msg as Message;
//   if (msg.author.id !== user.id) return;

//   if (enduranceRollEmojis.includes(reaction.emoji.identifier)) {
//     removeMsgFromStorage(reaction.message);
//   }
// });
