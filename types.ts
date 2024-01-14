import { Message } from "discord.js"

export interface Rotation {
    name: string
    time: string
    rewards: string[] | string[][]
    api: () => Promise<string>
}

export interface Schedule {
    name: string
    message: Message<true> | undefined
    callback: () => Promise<string>
}