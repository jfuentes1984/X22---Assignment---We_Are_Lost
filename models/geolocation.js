const axios = require('axios').default;

const Geolocation = {};

Geolocation.get = async () => {
    let loc = await axios.get(`http://api.positionstack.com/v1/forward?access_key=d01f6b07cc21b863dda61039f2b6983e&query=12%20Sussex%20Dr%20Ottawa%20ontario`);

    console.log(loc.data.data[0])
    return loc.data.data[0];
};

module.exports = Geolocation;