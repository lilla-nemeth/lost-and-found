const jwt = require('jsonwebtoken');

function authMw (request, response, next) {
    // token a kérés headers részében található
    let token = request.headers['x-auth-token'];
    

    // jsonwebtoken addig nem engedi tovább, amíg nem sikerült beazonosítani a felszhasználót 
    // a dekódolt token tartalmazza a felhasználó id-t + a megadott 

    // decodedToken az egy objektum, amiben van az id meg iat (issued at, létrehozás dátuma):
    if (token) {
        jwt.verify(token, 'r4uqSKqC6L', (err, decodedToken) => {
            if (decodedToken) {
                // userId = id from the token:
                request.userId = decodedToken.id;
                next();
            } else {
                response.status(401).json({msg: 'Token is not valid'})
            }
        })
    } else {
        response.status(401).json({msg: 'No token found'});
    }
}

module.exports = {
    authMw
}