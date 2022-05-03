

module.exports = (req, res, next) => {
    req.auth = { isAuthenticated: false };
    if (req.headers.authorization !== undefined) {
        let encodedAuthData = req.headers.authorization.split(" ")[1];
        console.log(req.headers.authorization)

        let authData = Buffer.from(encodedAuthData, "base64").toString();
        authData = authData.split(":");

        if (authData[0] == 'bob' && authData[1] == "bob1234") {
            req.auth.isAuthenticated = true;
            req.auth.userName = authData[0];

        }
    }

    next();

}