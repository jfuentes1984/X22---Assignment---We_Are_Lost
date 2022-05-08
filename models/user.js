const dbcPool = require('./db');
const GeolocationModel = require('./geolocation');

let User = {};

User.list = async function (order = "lastname", desc = false) {

    // SELECT UserId,`FirstName`,`LastName`,`PhoneNumber`,`StreetNumber`,`Street`,`Province`,`Country`,`Lat`,`Lng` FROM user ORDER BY `LastName`
    // let resultData = { status: false };
    // try {
    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT UserId, `FirstName`, `LastName`, `PhoneNumber`, `StreetNumber`, `Street`, `City`, `Province`, `Country`, `Lat`, `Lng` FROM user ORDER BY ? ?", [order, desc ? 'desc' : 'asc']);
    dbConn.end();
    //     resultData.data = rows;
    //     resultData.message = "success";
    //     resultData.status = true;
    // } catch (err) {
    //     resultData.message = "error reading users from db" + err.message;
    // }

    // return resultData;
    return rows;
}

User.delete = async function (UserId) {

    // SELECT UserId,`FirstName`,`LastName`,`PhoneNumber`,`StreetNumber`,`Street`,`Province`,`Country`,`Lat`,`Lng` FROM user ORDER BY `LastName`
    if (!isNaN(UserId)) {
        let dbConn = await dbcPool.getConnection();
        const rows = await dbConn.query("SELECT UserId,`FirstName`,`LastName`,`PhoneNumber`,`StreetNumber`,`Street`,`City`,`Province`,`Country`,`Lat`,`Lng` FROM user ORDER BY `LastName` ?, ?, ?, ?, ?, ?, ?, ?, ?, ?", [order, desc ? 'desc' : 'asc']);
        dbConn.end();
        //console.log(rows);
        return rows;
    }

}

User.insert = async function (data) {


    let gLoc = await GeolocationModel.get();
    console.log(gLoc);

    let resultData = { status: false };
    let dbConn = await dbcPool.getConnection();
    try {
        // INSERT INTO `users`.`user` (`FirstName`, `LastName`, `PhoneNumber`, `StreetNumber`, `Street`, `Province`) VALUES ('Joe', 'Joseph', '6135555555', '36', 'Maria St', 'Gatineau');
        results = await dbConn.query("INSERT INTO `users` (`FirstName`, `LastName`, `PhoneNumber`, `StreetNumber`,`Street`,`City`,`Province`,`Country`,`Lat`,`Lng`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.FirstName, data.LastName, data.PhoneNumber, data.StreetNumber, data.Street, data.City, data.Province, data.Country, gLoc.latitude, gLoc.longitude]);
        resultData.message = "data added";
        resultData.status = true;
        resultData.insertId = Number(results.insertId);

    } catch (err) {
        resultData.message = "could not add data: " + err.message;
    }
    dbConn.end();
    //console.log(rows);
    return resultData;
}

// Licensee.filterByDate = async function (date) {

//     // SELECT `licenseeId`,`first`,`last`,expiry from licensee ORDER BY expiry desc

//     let dbConn = await dbcPool.getConnection();
//     const rows = await dbConn.query("SELECT `licenseeId`,`first`,`last`,expiry from licensee WHERE expiry < ?", [date]);
//     dbConn.end();
//     //console.log(rows);
//     return rows;
// }




module.exports = User;