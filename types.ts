import { Message } from "discord.js"

export interface Rotation {
    name: string
    time: string
    rewards: string[] | string[][]
    api: (rotation: Rotation) => Promise<string>
}

export interface Schedule {
    name: string
    message: Message<true> | undefined
    rotation: Rotation
    callback: (rotation: Rotation) => Promise<string>
}