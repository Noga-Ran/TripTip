import { storageService } from './storage-service.js'

export const locService = {
    getLocs,
    addLocs,
    deleteLoc
}

const STORAGE_KEY = 'locations'

// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384, id:101 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581, id:102}
// ]
const locs = storageService.loadFromStorage(STORAGE_KEY) || [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, id:101 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, id:102}]

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

function addLocs(loc){
    locs.push(loc)
    storageService.saveToStorage(STORAGE_KEY, locs)
    onRenderLocation(locs)
}

function deleteLoc(locId){
    const index = locs.findIndex(object => {
        return object.id === locId;
    });

    locs.splice(index, 1)

    onRenderLocation(locs)
}