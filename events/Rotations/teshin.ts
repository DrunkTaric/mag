import 'dotenv/config'
import axios from 'axios';
import { Rotation } from '../../types';
import { structureMessage } from '../../utils';

module.exports = {
    name: 'Teshin',
    api: async (rotation: Rotation) => {
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/steelPath/")
            if (data.error) { return structureMessage(rotation.rewards, "Umbra Forma") }
            return structureMessage(rotation.rewards, data["currentReward"]["name"])
        }catch(_) {
            return structureMessage(rotation.rewards, "Umbra Forma")
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