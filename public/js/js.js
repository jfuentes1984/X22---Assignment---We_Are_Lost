mapboxgl.accessToken = "pk.eyJ1IjoibHBwNDIiLCJhIjoiY2wyYWZtNTFjMDUwMzNpcW50c3oyemp3aiJ9.EcrbBNeaSRbjO0IeCzlbnA";
let map;

let services = [];
let currentLocation;

const gotLocation = new Promise((resolve, reject) => {


    navigator.geolocation.watchPosition((pos) => {
        currentLocation = pos.coords;

        resolve(currentLocation);
    });
});

let getServicesOttawa = async () => {

    let FetchResult = await fetch('http://localhost:3000/api/servicesOttawa', {
        mode: 'no-cors'
    });

    let FetchResultJSON = await FetchResult.json();
    let i = 0;
    FetchResultJSON.features.forEach((el) => {
        const markerEl = document.createElement('div');
        markerEl.className = 'marker';

        let serviceData = {}

        switch (FetchResultJSON.features[i].properties.BUILDING_TYPE) {
            case "Police Station":
                markerEl.classList.add("police")
                serviceData.type = "police";
                break;
            case "Fire Station":
                markerEl.classList.add("fire")
                serviceData.type = "fire";
                break;
            case "Ambulance Facility":
                markerEl.classList.add("hospital")
                serviceData.type = "hospital";
                break;
            case "Veterinary Facility":
                markerEl.classList.add("veterinary")
                serviceData.type = "veterinary";
                break;
            default:
        }

        let coords = el.geometry.coordinates;

        lng = coords[0];
        lat = coords[1];

        if (lng == undefined || lat == undefined) {
            lng = '0';
            lat = '0';
        }

        serviceData.position = { lng: lng, lat: lat }
        serviceData.marker = new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).addTo(map);

        services.push(serviceData);
        i++;
    });
};

let getServicesGatineau = async () => {

    let FetchResult = await fetch('http://localhost:3000/api/servicesGatineau', {
        mode: 'no-cors'
    });

    let FetchResultJSON = await FetchResult.json();

    FetchResultJSON.features.forEach((el) => {

        if (el.properties.TYPE == "Centre hospitalier" || el.properties.TYPE == "Police provincial" || el.properties.TYPE == "Police municipale" || el.properties.TYPE == "Incendie") {

            const markerEl = document.createElement('div');
            markerEl.className = 'marker';

            let serviceData = {}

            switch (el.properties.TYPE) {
                case "Centre hospitalier":
                    markerEl.classList.add("hospital")
                    serviceData.type = "hospital";
                    break;
                case "Police provincial":
                    markerEl.classList.add("police")
                    serviceData.type = "police";
                    break;
                case "Police municipale":
                    markerEl.classList.add("police")
                    serviceData.type = "police";
                    break;
                case "Incendie":
                    markerEl.classList.add("fire")
                    serviceData.type = "fire";
                    break;
                default:
            }

            let coords = el.geometry.coordinates;
            lng = coords[0];
            lat = coords[1];

            if (lng == undefined || lat == undefined) {
                lng = '0';
                lat = '0';
            }

            serviceData.position = { lng: lng, lat: lat }
            console.log(serviceData.type);
            serviceData.marker = new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).setPopup(new mapboxgl.Popup().setHTML(`The Closest ${serviceData.type} is Here`)).addTo(map);            
            services.push(serviceData);
        }
    });
};

let mapInit = async function () {
    const username = "bob";
    const password = "bob1234";

    const encodedLoginInfo = btoa(`${username}:${password}`);
    let url = "http://localhost:3000/api";
    let data = await (await fetch(url, {
        headers: { Authorization: `Basic ${encodedLoginInfo}` }
    })).json();

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/lpp42/cl2ozenfq000c14p59ksrtw8j',
        center: [-75.704, 45.420],
        zoom: 10.5
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }
        })
    );
    await gotLocation;
    //console.log(currentLocation);
    getData();

};

let calcDistance = function (destination) {

    let p1 = turf.point([currentLocation.longitude, currentLocation.latitude]);
    let p2 = turf.point([destination.lng, destination.lat]);
    let distance = turf.distance(p1, p2);

    return distance;
}

let findClosest = async function (service) {

    let serviceDist;
    let serviceMarker;
    services.forEach((el) => {

        if (el.type == service) {
            let distance = calcDistance(el.position);
            if (serviceDist == undefined || distance < serviceDist) {
                serviceDist = distance;
                serviceMarker = el;
            }
        }
    });

    //console.log(serviceMarker, serviceDist);
    map.flyTo({ center: [serviceMarker.position.lng, serviceMarker.position.lat] });
    serviceMarker.marker.togglePopup();
}

let getData = async () => {
    await getServicesOttawa();
    await getServicesGatineau();
}

let serviceBtns = document.getElementsByClassName('serviceBtn');

const arr = [1, 2, 3];

for (let btn of serviceBtns) {
    btn.addEventListener("click", function () {
        findClosest(btn.dataset.serv);
    });
}

mapInit();