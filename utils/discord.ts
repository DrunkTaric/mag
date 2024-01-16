import { EmbedBuilder, Message, TextChannel } from "discord.js";

export async function sendMessage(msg: string | EmbedBuilder, channel: TextChannel | undefined) {
    if (msg instanceof EmbedBuilder) {
        return await channel?.send({ embeds: [msg] })
    }
    return await channel?.send(msg)
}

export async function editMessage(msg: string | EmbedBuilder, message: Message<true> | undefined) {
    if (msg instanceof EmbedBuilder) {
        return await message?.edit({ embeds: [msg] })
    }
    return await message?.edit(msg)
}

export async function clearChannel(channel: TextChannel | undefined) {
    for (let message of await channel?.messages.fetch() || []) {
        message[1].delete()
    }
}