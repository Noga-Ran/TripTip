import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRenderLocation= onRenderLocation
window.onDeleteLoc = onDeleteLoc
window.onSearch = onSearch;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));

    locService.renderLocs().then(() => {
        console.log('location is ready');
    })
    .catch(() => console.log('Error: cannot init location'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(lat= 32.0749831, lng= 34.9120554) {
    console.log('Adding a marker');
    mapService.addMarker(lat, lng); //nogs note - need to change to make non stati
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords.latitude);
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                onPanTo(pos.coords.latitude,pos.coords.longitude)
                onAddMarker(pos.coords.latitude,pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })


}
function onPanTo(lat, lng) {
    console.log('Panning the Map', lat,lng);
    mapService.panTo({lat, lng}); 
}

function onDeleteLoc(id) {
    locService.deleteLoc(id)
}

function onRenderLocation(loactions) {
    var elLocsList = document.querySelector('.loactions-container')
    var newHtml = loactions.map(loc => {
        return `<div>
        <li>${loc.name}</li>
        <button onClick=onPanTo(${loc.lat},${loc.lng})>Go</button>
        <button onClick=onDeleteLoc('${loc.id}')>Delete</button>
        </div>`
    })
    newHtml.push('</ul></div>')
    newHtml.unshift(`<div class="location"><h3>My Locations</h3><ul>`)
    elLocsList.innerHTML = newHtml.join(' ')
    
}

function onSearch(){
    const elInputSearch = document.querySelector('input[name=search]');
    mapService.locationByName(elInputSearch.value)
}