import { scheduleJob } from "node-schedule"
import { EmbedBuilder, TextChannel } from "discord.js"
import path from "node:path"
import fs from "node:fs"


export async function getRotations(channel: TextChannel | undefined) {
    let message = await channel?.send("Rotations");
    const filesPath = path.join(__dirname);
    const files = fs.readdirSync(filesPath);
    let rotations: { name: string, value: string, inline: boolean }[] = []
    for (const file of files) {
        if (file == "loader.js") { continue; }
        const filePath = path.join(filesPath, file);
        let rotation = require(filePath);
        if (rotation.alone) { continue; }
        rotations.push({ name: rotation.name, value: `
            Current:
            __${await rotation.api()}__
            Rewards:
            ${rotation.rewards.join("\n")}
        `, inline: true })
        let job = scheduleJob(rotation.name, rotation.time, async () => {
            console.log("Rotations: " + rotation.name)
            rotations.map(async (rot) => { if(rot.name == rotation.name) rot.value = `
                Current:
                __${await rotation.api()}__
                Rewards:
                ${rotation.rewards.join("\n")}
            ` });
            await message?.edit({ embeds: [
                new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Rotations")
                    .addFields(rotations)
            ]});
        })
    }
    message?.edit({ embeds: [
        new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields(rotations)
    ]});
}