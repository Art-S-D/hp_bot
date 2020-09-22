import { Message, EmojiResolvable } from "discord.js";

// returns a guild emoji or the plain string if it does not match any
export function emojiFromString(msg: Message, emoji: string): EmojiResolvable {
    return (msg.guild?.emojis.cache.find((e) => e.name === emoji) || emoji) as EmojiResolvable;
}
