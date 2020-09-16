import {
  Message,
  MessageReaction,
  User,
  PartialUser,
  EmojiResolvable,
} from "discord.js";

import { d20 } from "./index";
import { Id20 } from "./types";
import client from "../../client";

let storedLearningRolls: Message[] = [];

const enduranceRollEmojis = ["d20", "d15", "d10"];

export function isLearningRoll({ bonus1, bonus2, reroll }: Id20): boolean {
  return (
    ((bonus1 === "esprit" && bonus2 === "magie") ||
      (bonus1 === "magie" && bonus2 === "esprit")) &&
    reroll === "enchantement"
  );
}

export async function addEnduranceRerollReactions(msg: Message) {
  for (const emoji of enduranceRollEmojis) {
    await msg.react(
      msg.guild?.emojis.cache.find(
        (e) => e.identifier === emoji
      ) as EmojiResolvable
    );
  }
}

function getStored(msg: Message): Message | undefined {
  return storedLearningRolls.find((message: Message) => msg.id === message.id);
}

function removeMsgFromStorage(msg: Message) {
  storedLearningRolls = storedLearningRolls.filter((m) => m.id !== msg.id);
}

client.on("messageReactionAdd", function (
  reaction: MessageReaction,
  user: User | PartialUser
) {
  const _msg = getStored(reaction.message);
  if (!_msg) return;
  const msg = _msg as Message;
  if (msg.author.id !== user.id) return;

  if (enduranceRollEmojis.includes(reaction.emoji.identifier)) {
    removeMsgFromStorage(reaction.message);
  }
});
