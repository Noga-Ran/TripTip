//AIzaSyBAGrneJg_3nVxueyTP5LHJcvP_CiFg9xU

import { locService } from './loc.service.js'
const onAddLocs = locService.addLocs


export const mapService = {
    initMap,
    addMarker,
    panTo
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            gMap.addListener("click", (e) => {
            console.log(e.latLng.toJSON())
            panTo(e.latLng.toJSON());
                // console.log(e.latLng.toJSON());
                findLocationName(e.latLng.toJSON())
                panTo(e.latLng);
            })
        })
}

function addMarker() {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo({lat, lng}) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    console.log('laLatLng',laLatLng)
    gMap.panTo(laLatLng);
    //add to saved loaction

}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAFIrpyP3UsU9Zqgkv97bPzLIo3mNrpaKI'; //Done: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function findLocationName({lat,lng}) {
    // console.log(lat, lng);

    const API_KEY = 'AIzaSyA2AxIb85Vl7Ms8mi7l3iE4njCWjR9nkCQ'; //Done: Enter your API Key
    const latLan=lat+', '+lng
    const prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLan}&sensor=true&key=${API_KEY}`).then(res => res.json())
    prm.then(createLocObj)
}

function printLoc(location){
    console.log(location.results[0].formatted_address,'\n',location.results[0].place_id,'\n',location.results[0].geometry.location);
    // saveLocation(location.results[0].formatted_address,location.results[0].id)
}
locationByName('israel')
function locationByName(name){
    const API_KEY = 'AIzaSyA2AxIb85Vl7Ms8mi7l3iE4njCWjR9nkCQ'
    const prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`).then(res => console.log('res',res.json()))
}
function createLocObj(location){
    // console.log(location.results[0].formatted_address,'\n',location.results[0].place_id,'\n',location.results[0].geometry.location);
    var loaction = {
        name: location.results[0].formatted_address,
        id: location.results[0].place_id,
        lat: location.results[0].geometry.location.lat,
        lng: location.results[0].geometry.location.lng,
    }

    // console.log(loaction);
    onAddLocs(loaction)
}