import 'dotenv/config'
import axios from 'axios';
import { Rotation } from '../../types';
import { structureMessage } from '../../utils/rotations';
import { TeshinRewards } from '../../static';

module.exports = {
    name: 'Teshin',
    api: async () => {
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/steelPath/")
            if (data.error) { return structureMessage(TeshinRewards, "Umbra Forma") }
            return structureMessage(TeshinRewards, data["currentReward"]["name"])
        }catch(_) {
            return structureMessage(TeshinRewards, "Umbra Forma")
        }
    },
    time: '*/2 * * * *'
}