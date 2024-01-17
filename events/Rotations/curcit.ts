import 'dotenv/config'
import axios from 'axios';
import { structureMessage } from '../../utils/rotations';
import CurcitRewards from '../../public/rewards/curcit';

module.exports = {
    name: 'Duviri Curcit',
    api: async () => {
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/duviriCycle/")
            if (data.error) { return structureMessage(CurcitRewards, "Braton")  }
            return structureMessage(CurcitRewards, data["choices"][1]["choices"][0]) 
        }catch(_) {
            return structureMessage(CurcitRewards, "Braton") 
        }
    },
    time: '*/2 * * * *',
}