export function getIndex(list : string[][] | string[], current: string) {
    if (Array.isArray(list[0])) {
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                if (list[i][j].includes(current)) {
                    return i
                }   
            }
        }
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(current)) {
            return i
        }
    }

    return 0
}