var express = require('express');
var router = express.Router();
const axios = require('axios').default;


router.get('/services', async function(req, res) {

    let url = "http://maps.ottawa.ca/arcgis/rest/services/City_Facilities/MapServer/3/query?outFields=*&where=1%3D1&f=geojson";
    let aResponse = await axios.get(url);

    res.json(aResponse.data);
});

module.exports = router;