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
    rotation: Rotation
    callback: () => Promise<string>
}

export interface MetaData {
    name: string
    description: string
}

export interface File {
    metadata: MetaData
    command?: any
    commands?: any[]
    callbacks?: any[]
}