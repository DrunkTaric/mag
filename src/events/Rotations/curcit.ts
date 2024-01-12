import 'dotenv/config'
import axios from 'axios';
import { Rotation } from '../../types';

module.exports = {
    name: 'Duviri Curcit',
    api: async (rotation: Rotation) => {
        try {
            const { data } = await axios.get("https://api.warframestat.us/pc/en/duviriCycle/")
            if (data.error) { return "Braton" }
            return data["choices"][1]["choices"][0]
        }catch(_) {
            return "Braton"
        }
    },
    time: '*/2 * * * *',
    rewards: [
        [`Braton Incarnon Genesis`, `Lato Incarnon Genesis`, `Skana Incarnon Genesis`, `Paris Incarnon Genesis`, `Kunai Incarnon Genesis`],
        [`Boar Incarnon Genesis`, `Gammacor Incarnon Genesis`, `Angstrum Incarnon Genesis`, `Gorgon Incarnon Genesis`, `Anku Incarnon Genesis`],
        [`Bo Incarnon Genesis`, `Latron Incarnon Genesis`, `Furis Incarnon Genesis`, `Furax Incarnon Genesis`, `Strun Incarnon Genesis`],
        [`Lex Incarnon Genesis`, `Magistar Incarnon Genesis`, `Boltor Incarnon Genesis`, `Bronco Incarnon Genesis`, `Ceramic Dagger Incarnon Genesis`],
        [`Torid Incarnon Genesis`, `Dual Toxocyst Incarnon Genesis`, `Dual Ichor Incarnon Genesis`, `Miter Incarnon Genesis`, `Atomos Incarnon Genesis`],
        [`Zylok Incarnon Genesis`, `Sibear Incarnon Genesis`, `Dread Incarnon Genesis`, `Despair Incarnon Genesis`, `Hate Incarnon Genesis`],
    ],
}