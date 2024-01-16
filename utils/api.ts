import axios from "axios";

export async function warframe(query: string) {
    try {
        const { data } = await axios.get(`https://api.warframestat.us/${query}`)

        if (data.error) return null
        
        return data
    }catch(_) {
        return null
    }
}