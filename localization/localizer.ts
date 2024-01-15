class Localizer {
    file: { [key: string]: string }
    constructor(language: string) {
        try {
            this.file = require(`./${language}.json`)
        }catch(_) {
            this.file = require(`./en.json`)
        }
    }
    get(key: string) {
        return this.file[key]
    }
}