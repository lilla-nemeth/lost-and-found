const jwt = require('jsonwebtoken');


// add middlewares:

// pw islongenough
// phone number format


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

function isEmailValid (request, response, next) {
    let email = request.body.email;

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    const at = '@';
    const dot = '.';

    if (!email) {
        response.status(400).json({msg: "Email field is empty"});
    }

    if (!email.includes(at) || !email.includes(dot)) {
        response.status(400).json({msg: 'Your email format is not valid'});
    }

    let validByRegexp = emailRegexp.test(email);
    if (!validByRegexp) {
        response.status(400).json({msg: 'Email includes invalid characters'});
    }

    if (email.length > 254) {
        response.status(400).json({msg: 'Email length exceeds the maximum'});
    }

    let emailParts = email.split("@");
    if (emailParts[0].length > 64) {
        response.status(400).json({msg: 'Email username is too long'})
    }

    let domainParts = emailParts[1].split('.');
    if (domainParts.some(function(part) {return part.length > 63;})) {
        response.status(400).json({msg: 'Email domain name is too long'});
    }

    next();
}

module.exports = {
    authMw,
    isEmailValid
}