import { Message, GuildMember } from "discord.js";

export function getRoles(msg: Message): string[] | undefined {
    return msg.member?.roles?.cache?.map((r) => r.name);
}

export default function hasRole(msg: Message, role: string) {
    return (getRoles(msg)?.filter((x) => x === role)?.length || 0) > 0;
}
