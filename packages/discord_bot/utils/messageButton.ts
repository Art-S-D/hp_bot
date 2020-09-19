import { Message, EmojiResolvable } from "discord.js";

const RESPONSE_TIME = 1000 * 60 * 10;

async function addReactions(msg: Message, reactions: string[]) {
  for (const emoji of reactions) {
    await msg.react((msg.guild?.emojis.cache.find((e) => e.name === emoji) || emoji) as EmojiResolvable);
  }
}

export async function messageButton(
  msg: Message,
  options: string[],
  replierIds: string[] = [msg.author.id],
  removeEmojis: boolean = false
): Promise<string | undefined> {
  // used to react with the emojis in order without blocking the awaitReaction call
  await addReactions(msg, options);

  const reaction = await msg
    .awaitReactions((reaction, user) => replierIds.includes(user.id) && options.includes(reaction.emoji.name), {
      time: RESPONSE_TIME,
      max: 1,
    })
    .catch((e) => {
      console.warn(e);
      return undefined;
    });

  if (removeEmojis) msg.reactions.removeAll();

  return reaction?.first()?.emoji?.name;
}
