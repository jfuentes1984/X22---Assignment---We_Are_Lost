const axios = require('axios').default;

const Geolocation = {};

Geolocation.get = async (data) => {
    let loc = await axios.get(`http://api.positionstack.com/v1/forward?access_key=d01f6b07cc21b863dda61039f2b6983e&query=${data.streetNumber} ${data.Street} ${data.City} ${data.Province}&limit=1`);

    if (loc.data.length < 1) {
        return false;
    }
    // console.log(loc.data.data[0])
    return loc.data.data[0];
};

module.exports = Geolocation;