mapboxgl.accessToken = "pk.eyJ1IjoibHBwNDIiLCJhIjoiY2wyYWZtNTFjMDUwMzNpcW50c3oyemp3aiJ9.EcrbBNeaSRbjO0IeCzlbnA";
let map;

let services = [];

let getServicesOttawa = async () => {

    let FetchResult = await fetch('http://localhost:3000/api/servicesOttawa', {
        mode: 'no-cors'
    });

    let FetchResultJSON = await FetchResult.json();

    // console.log(FetchResultJSON.features);

    FetchResultJSON.features.forEach((el) => {

        let coords = el.geometry.coordinates;

        lng = coords[0];
        lat = coords[1];

        services.push(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map));

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

            let coords = el.geometry.coordinates;

            lng = coords[0];
            lat = coords[1];

            services.push(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map));
        }
    });
};

let mapInit = function () {
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