import fs from "fs"
import path from "path"
import axios from "axios"
import Items from "warframe-items"

const Links = {
    "arcanes": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Arcanes.json",
    "melee": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Melee.json",
    "primary": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Primary.json",
    "secondary": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Secondary.json",
    "warframe": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Warframes.json",
    "mods": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Mods.json"
    "mods": "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Mods.json",
}

function structureItem(item: any) {
    return {
        name: item.name,
        image: item.imageName,
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
                    items.push(structureItem(item))
                }
            })
            items
            .sort((a: any, b: any) => a.name - b.name)
            let file = path.join(__dirname, "public", "items",`${key}.json`)
            fs.writeFileSync(file, JSON.stringify(items, null, 2))
        }catch(_) {
            continue
        }
    }
}

fetch()