// import { appController } from '../app.controller.js'
// const renderLocation = appController.onRenderLocation


export const locService = {
    getLocs,
    addLocs,
    deleteLoc
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, id:101 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, id:102}
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function addLocs(loc){
    locs.push(loc)
    onRenderLocation(locs)
}

function deleteLoc(locId){
    const index = locs.findIndex(object => {
        return object.id === locId;
    });

    locs.splice(index, 1)

    onRenderLocation(locs)
}