const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const auth = require('../middleware/authorization');
const User = require('../models/user');
const { insert } = require('../models/user');
const UserModel = require('../models/user');

router.use(auth);

router.get('/', async function (req, res, next) {
    let userList = await UserModel.list();
    console.log(userList);

    if (userList.status == true) {
        res.json(userList.data);
    } else {
        res.json(userList);
    }

    // if (req.auth.isAuthenticated) {
    //     res.json({ result: true });

    // } else {
    //     res.json({ result: false });
    // }
});

router.delete('/:id', async function (req, res, next) {

    let UserId = req.params.id;
    await UserModel.delete(UserId);
    res.json({ "result": true });

});

router.post('/', async function (req, res, next) {
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

    let result = await UserModel.insert(data);
    // console.log(contactList);
    // res.send("contactList");
    res.json(result);
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