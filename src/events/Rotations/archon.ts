import 'dotenv/config'
import axios from 'axios';

module.exports = {
    name: 'Archon',
    alone: false,
    api: async () => {
        const list: {[key: string]: string} = {
            "Archon Boreal": `${process.env["BLUE_SHARD"]} Blue Shard`, 
            "Archon Amar": `${process.env["RED_SHARD"]} Red Shard`, 
            "Archon Nira": `${process.env["YELLOW_SHARD"]} Yellow Shard`
        }
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/archonHunt")
            if (data.error) { return list["Archon Boreal"] }
            return list[data["boss"]]
        }catch(_) {
            return list["Archon Boreal"]
        }
    },
    time: '*/1 * * * *',
    rewards: [
        `${process.env["BLUE_SHARD"]} Blue Shard`,
        `${process.env["RED_SHARD"]} Red Shard`,
        `${process.env["YELLOW_SHARD"]} Yellow Shard`,
    ],
}