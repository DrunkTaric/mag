import { EmbedBuilder, TextChannel } from "discord.js"
import corn from "node-cron"
import path from "node:path"
import fs from "node:fs"
import { editMessage, sendMessage } from "../../utils/discord";
import { Schedule } from "../../types";

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

function makeSchedules(schedules: { [key: string]: Schedule[] }, channel: TextChannel | undefined) {
    if (!schedules) { return; }
    if (!channel) { return; }
    for (const [key, value] of Object.entries(schedules)) {
        corn.schedule(key, async () => {
            for (const schedule of value) {
                editMessage(new EmbedBuilder().setTitle(schedule.name).setColor(0x0099FF).addFields({ name: schedule.name, value: await schedule.callback() }), schedule.message);
                console.log("Updated Rotation: " + schedule.name)
            }
            console.log("=================")
        })
    }

}
}