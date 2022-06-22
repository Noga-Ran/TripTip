export const locService = {
    getLocs,
    addLocs
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

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
    console.log('example')
    console.log('locs',locs)
}