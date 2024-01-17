import 'dotenv/config'
import axios from 'axios';
import ArchonRewards from '../../public/rewards/archon';
import { structureMessage } from '../../utils/rotations';

const list = [ "Archon Boreal", "Archon Amar", "Archon Nira" ]

module.exports = {
    name: 'Archon',
    api: async () => {
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/archonHunt")
            if (data.error) { return structureMessage(ArchonRewards, ArchonRewards[0]) }
            return structureMessage(ArchonRewards, ArchonRewards[list.indexOf(data["boss"], 1)])
        }catch(_) {
            return structureMessage(ArchonRewards, ArchonRewards[0])
        }
    },
    time: '*/1 * * * *',
}