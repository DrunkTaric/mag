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

export function getIndex(list : string[][] | string[], current: string) {
    if (Array.isArray(list[0])) {
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                if (list[i][j].includes(current)) {
                    return i
                }   
            }
        }
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(current)) {
            return i
        }
    }

    return 0
}

export function getRewardsAsString(list: string[]) {
    let rewards = ""

    for (let i = 0; i < list.length; i++) {
        rewards += `**${list[i]}**\n`
    }

    return rewards
}

export function structureMessage(rewards: string[] | string[][], current: string) {
    let message = "";
    if (Array.isArray(rewards[0])) {
        let arrayIndex = getIndex(rewards as string[][], current)
        message += `**Current Week Rewards:**\n`
        for (let i = 0; i < rewards[arrayIndex].length; i++) {
            message += `${rewards[arrayIndex][i]}\n`
        }
        message += `**Next Week Rewards:**\n`
        arrayIndex = rewards.length - 1 >= arrayIndex + 1? arrayIndex + 1 : 0
        for (let i = 0; i < rewards[arrayIndex].length; i++) {
            message += `${rewards[arrayIndex][i]}\n`
        }
        return message
    }
    message += `**Current:**\n`
    message += `${rewards[getIndex(rewards, current)]}\n`
    message += `**Rewards:**\n`
    for (let i = 0; i < rewards.length; i++) {
        message += `${rewards[i]}\n`
    }
    return message
}