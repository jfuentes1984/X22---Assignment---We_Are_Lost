import "./css/styles.css";
import layoutTemplate from "./hbs/layout.hbs";
import layoutMap from "./hbs/map.hbs";
import layoutUser from "./hbs/user.hbs";

import module from "./js/module";


const appEl = document.getElementById("app");
const siteInfo = { title: "Sample WebPack+Handlebars Frontend" };
const usersUrl = "https://localhost:3000/api/";

window.document.title = siteInfo.title;
appEl.innerHTML = layoutTemplate(siteInfo);
const mapEl = document.getElementById("map-pane");
mapEl.innerHTML = layoutMap();

const usersEl = document.getElementById("users-pane");


mapboxgl.accessToken = "pk.eyJ1IjoibHBwNDIiLCJhIjoiY2wyYWZtNTFjMDUwMzNpcW50c3oyemp3aiJ9.EcrbBNeaSRbjO0IeCzlbnA";
let map;

let init = async function () {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/lpp42/cl2ozenfq000c14p59ksrtw8j',
        center: [-75.704, 45.420],
        zoom: 10.5
    });
    getUsers();

}

let markers = {};

let getUsers = async () => {
    let usersList = (await fetch(usersUrl,
        {
            mode: 'cors'
        }
    )).json();

    usersList.forEach((el) => {
        markers[el.UserId + ""] = new mapboxgl.Marker({ color: "#aa1acd" })
            .setLngLat(el.Lng, el.Lat)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>" + el.FirstName + "</h1>"));
    });

    // console.log(markers);

    usersEl.innerHTML = layoutUser(usersList);
    let btns = usersEl.querySelectorAll(".locateBtn");

    btns.forEach((el) => {
        el.addEventListener("click", function () {
            // console.log(markers[this.parentNode.dataset.userid]);
            markers[this.parentNode.dataset.userid].addTo(map);
        })
    })

    return (usersList);
}

init();