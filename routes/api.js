var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const auth = require('../Middleware/auth');

router.use(auth);

router.get('/', function (req, res, next) {
    if (req.auth.isAuthenticated) {
        res.json({ result: true });

    } else {
        res.json({ result: false });
    }
});


router.get('/servicesOttawa', async function(req, res) {

    let url = "http://maps.ottawa.ca/arcgis/rest/services/City_Facilities/MapServer/3/query?outFields=*&where=1%3D1&f=geojson";
    let aResponse = await axios.get(url);

    res.json(aResponse.data);
});

router.get('/servicesGatineau', async function(req, res) {

    let url = "http://www.gatineau.ca/upload/donneesouvertes/LIEU_PUBLIC.json";
    let aResponse = await axios.get(url);

    res.json(aResponse.data);
});

module.exports = router;