import fs from "fs"
import path from "path"
import axios from "axios"

const Links = {
    "arcanes": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Arcanes.json",
    "melee": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Melee.json",
    "primary": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Primary.json",
    "secondary": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Secondary.json",
    "warframe": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Warframes.json",
    "mods": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Mods.json",
    "relics": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Relics.json"
}

function structureItem(item: any) {
    return {
        name: item.name,
        market_name: item.name.replace(" ", "_").toLowerCase(),
        image: `https://cdn.warframestat.us/img/${item.imageName}`,
        drops: item.drops
    }
}

async function fetch() {
    for (const [key, value] of Object.entries(Links)) {
        let items: { name: any; image: any }[] = []
        try {
            const { data } = await axios.get(value)
            if (data.error) continue

            data.forEach((item: any) => {
                if (item.name.toLowerCase() != "arcane") { 
                    let drops: { location: any; chance: any; rarity: any }[] = []
                    data.forEach((item2: any) => {
                        if (item2.drops) {
                            for (let i = 0; i < item2.drops.length; i++) {
                                let drop = item2.drops[i]
                                if (drop.type == item.name) {
                                    drops.push({
                                        location: drop.location,
                                        chance: drop.chance,
                                        rarity: drop.rarity
                                    })
                                }
                            }   
                        }
                    })
                    item.drops = drops
                    items.push(structureItem(item))
                }
            })
            items
            .sort((a: any, b: any) => a.name - b.name)
            let file = path.join(__dirname, "public", "items",`${key}.json`)
            fs.writeFileSync(file, JSON.stringify(items, null, 2))
        }catch(err) {
            console.log(err)
            continue
        }
    }
}

fetch()