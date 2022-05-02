var express = require('express');
var router = express.Router();
const axios = require('axios').default;


router.get('/hydrants', async function(req, res) {

    let url = "https://www.gatineau.ca/upload/donneesouvertes/BORNE_FONTAINE.xml";
    // let url = "https://maps.ottawa.ca/arcgis/rest/services/Hospitals/MapServer/0/query?outFields=*&where=1%3D1&f=geojson";
    let aResponse = await axios.get(url);

   
    res.header("Content-Type", "application/xml");
    // res.header("Content-Type", "application/json");
    res.send(aResponse.data);

});

module.exports = router;