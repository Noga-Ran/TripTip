import { storageService } from './storage-service.js'

export const locService = {
    getLocs,
    addLocs
}

const STORAGE_KEY = 'locations'

const locs = storageService.loadFromStorage(STORAGE_KEY)

console.log('locs',locs)
function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function addLocs(loc){
    locs.push(loc)
    storageService.saveToStorage(STORAGE_KEY, locs)
}