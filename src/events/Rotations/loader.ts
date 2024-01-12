import { EmbedBuilder, TextChannel } from "discord.js"
import corn from "node-cron"
import path from "node:path"
import fs from "node:fs"


export async function getRotations(channel: TextChannel | undefined) {
    let message = await channel?.send("Rotations");
function PullFiles() {
    let files = []
    const filesPath = path.join(__dirname);
    const file_names = fs.readdirSync(filesPath);
    for (const file_name of file_names) {
        if (file_name == "loader.js") { continue; }
        const filePath = path.join(filesPath, file_name);
        let file = require(filePath);
        files.push(file)
    }
    return files
}
        })
    }
    message?.edit({ embeds: [
        new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields(rotations)
    ]});
}