const fs = require("fs")
const path = require("path");
const itemsFolderPath = path.join(__dirname, "..", "items");
const rawItemsPath = path.join(itemsFolderPath, "items_raw.json");
const exportedItemsPath = path.join(itemsFolderPath, "items.json");

let rawItems = require(rawItemsPath)

rawItems = rawItems.filter((x) => { return x != null && x.tradable == true})
let exportedItems = []
rawItems.forEach(x => {
    exportedItems.push({
        name: x.name,
        type: x.type,
        rarity: x.rarity,
        image: {
            name: x.imageName,
            path: `/imgs/${x.imageName}`
        },
        market: {
            name: x.name.toLowerCase().replaceAll(" ", "_")
        },
        wiki: {
            link: x.wikiaUrl,
            thumbnail: x.wikiaThumbnail
        }
    })
});

fs.writeFileSync(exportedItemsPath, JSON.stringify(exportedItems, null, " "))