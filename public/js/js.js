mapboxgl.accessToken = "pk.eyJ1IjoibHBwNDIiLCJhIjoiY2wyYWZtNTFjMDUwMzNpcW50c3oyemp3aiJ9.EcrbBNeaSRbjO0IeCzlbnA";
let map;

let services = [];

let getServicesOttawa = async () => {

    let FetchResult = await fetch('http://localhost:3000/api/servicesOttawa', {
        mode: 'no-cors'
    });

    let FetchResultJSON = await FetchResult.json();

    // console.log(FetchResultJSON.features);
    let i = 0;
    FetchResultJSON.features.forEach((el) => {

        console.log(FetchResultJSON.features[i].properties.BUILDING_TYPE);

        const markerEl = document.createElement('div');
        markerEl.className = 'marker';

        switch (FetchResultJSON.features[i].properties.BUILDING_TYPE) {
            case "Police Station":
                markerEl.classList.add("police")
                break;
            case "Fire Station":
                markerEl.classList.add("fire")
                break;
            case "Ambulance Facility":
                markerEl.classList.add("hospital")
                break;
            case "Veterinary Facility":
                markerEl.classList.add("veterinary")
                break;           
            default:
        }

        let coords = el.geometry.coordinates;

        lng = coords[0];
        lat = coords[1];

        services.push(new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).addTo(map));
        i++;
    });
};

let getServicesGatineau = async () => {

    let FetchResult = await fetch('http://localhost:3000/api/servicesGatineau', {
        mode: 'no-cors'
    });
    let FetchResultJSON = await FetchResult.json();
    // console.log(FetchResultJSON.features);

    FetchResultJSON.features.forEach((el) => {

        // console.log(el.properties.TYPE);

        if (el.properties.TYPE == "Centre hospitalier" || el.properties.TYPE == "Police provincial" || el.properties.TYPE == "Police municipale" || el.properties.TYPE == "Incendie") {

            const markerEl = document.createElement('div');
            markerEl.className = 'marker';

            switch (el.properties.TYPE) {
                case "Centre hospitalier":
                    markerEl.classList.add("hospital")
                    break;
                case "Police provincial":
                    markerEl.classList.add("police")
                    break;
                case "Police municipale":
                    markerEl.classList.add("police")
                    break;
                case "Incendie":
                    markerEl.classList.add("fire")
                    break;
                default:
            }

            let coords = el.geometry.coordinates;
            lng = coords[0];
            lat = coords[1];

            services.push(new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).addTo(map));
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

    console.log(data);

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/lpp42/cl2ozenfq000c14p59ksrtw8j',
        center: [-75.704, 45.420],
        zoom: 10.5
    });
}

mapInit();
getServicesOttawa();
getServicesGatineau();