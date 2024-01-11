import 'dotenv/config'
import axios from 'axios';

module.exports = {
    name: 'Teshin',
    alone: false,
    api: async () => {
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/steelPath/")
            if (data.error) { return "Umbra Forma" }
            return data["currentReward"]["name"]
        }catch(_) {
            return "Umbra Forma"
        }
    },
    time: '*/2 * * * *',
    rewards: [
        `${process.env["UMBRA_FORMA"]} Umbra Forma ${process.env["STEEL_ESSENCE"]} 150`,
        `${process.env["KUVA"]} 50,000 Kuva ${process.env["STEEL_ESSENCE"]} 55`,
        `${process.env["RIVEN"]} Kitgun Riven Mod ${process.env["STEEL_ESSENCE"]} 75`,
        `${process.env["FORMA"]} 3x Forma ${process.env["STEEL_ESSENCE"]} 75`,
        `${process.env["RIVEN"]} Zaw Riven Mod ${process.env["STEEL_ESSENCE"]} 75`,
        `${process.env["RIVEN"]} 30,000 Endo ${process.env["STEEL_ESSENCE"]} 150`,
        `${process.env["RIVEN"]} Rifle Riven Mod ${process.env["STEEL_ESSENCE"]} 75`,
        `${process.env["RIVEN"]} Shotgun Riven Mod ${process.env["STEEL_ESSENCE"]} 75`,
    ],
}