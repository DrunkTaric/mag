import 'dotenv/config'
import axios from 'axios';

module.exports = {
    name: 'Archon',
    alone: false,
    api: async () => {
        const list: {[key: string]: string} = {"Archon Boreal": "Blue Shard", "Archon Amar": "Red Shard", "Archon Nira": "Yellow Shard"}
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/archonHunt")
            if (data.error) { return "Blue Shard" }
            console.log(data["boss"])
            return list[data["boss"]]
        }catch(_) {
            return "Blue Shard"
        }
    },
    time: 1000 * 60 * 60 * 24,
    rewards: [
        `${process.env["BLUE_SHARD"]} Blue Shard`,
        `${process.env["RED_SHARD"]} Red Shard`,
        `${process.env["YELLOW_SHARD"]} Yellow Shard`,
    ],
}