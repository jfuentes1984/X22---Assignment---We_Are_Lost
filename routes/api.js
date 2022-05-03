const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const auth = require('../middleware/authorization');
const UserModel = require('../models/user');

router.use(auth);

router.get('/', async function (req, res, next) {
    let userList = await UserModel.list();
    console.log(userList);
    res.json(userList);

    // if (req.auth.isAuthenticated) {
    //     res.json({ result: true });

    // } else {
    //     res.json({ result: false });
    // }
});

router.get('/add', async function (req, res, next) {
    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        streetNumber: req.body.streetNumber,
        Street: req.body.Street,
        City: req.body.City,
        Province: req.body.Province,
        Country: req.body.Country
    };

    let result = await UserModel.insert();
    // console.log(contactList);
    // res.send("contactList");
    res.json({});
});



router.get('/servicesOttawa', async function (req, res) {

    let url = "http://maps.ottawa.ca/arcgis/rest/services/City_Facilities/MapServer/3/query?outFields=*&where=1%3D1&f=geojson";
    let aResponse = await axios.get(url);

    res.json(aResponse.data);
});

router.get('/servicesGatineau', async function (req, res) {

    let url = "http://www.gatineau.ca/upload/donneesouvertes/LIEU_PUBLIC.json";
    let aResponse = await axios.get(url);

    res.json(aResponse.data);
});

module.exports = router;