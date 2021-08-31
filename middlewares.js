const jwt = require('jsonwebtoken');

let DEBUG = true;

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

function isUsernameValid (request, response, next) {
    let username = request.body.username;

    // allowed characters: alphanumeric characters, dots and underscores 
    const usernameRegex = /^[a-zA-Z][A-Za-z0-9_\.]*$/;
    const usernameFirstCharacter = /^[a-zA-Z]/;

    if (!username) {
        response.status(400).json({msg: 'Username field is required'})
    }

    // if (username.length < 2 && username.length > 30) {
    //     response.status(400).json({msg: 'Username length must be between 2 and 30 characters'})
    // }

    if (username.length < 2) {
        response.status(400).json({msg: 'Username must contain at least 2 characters'});
    }

    if (username.length > 30) {
        response.status(400).json({msg: 'Username must be less than 30 characters'});
    }
    
    let isFirstCharacterValid = usernameFirstCharacter.test(username);
    if (!isFirstCharacterValid) {
        response.status(400).json({msg: 'Username must start with a letter'})
    }

    let validByUsernameRegex = usernameRegex.test(username);
    if (!validByUsernameRegex) {
        response.status(400).json({msg: 'Username contains invalid character'})
    }

    next();
}

function isEmailValid (request, response, next) {
    let email = request.body.email;

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) {
        response.status(400).json({msg: 'Email field is required'});
    }

    let validByEmailRegex = emailRegex.test(email);
    if (!validByEmailRegex) {
        response.status(400).json({msg: 'Email format is not valid'});
    }
    
    if (email.length > 254) {
        response.status(400).json({msg: 'Email length exceeds the maximum'});
    }

    let emailParts = email.split("@");
    
    if (emailParts[0].length > 64) {
        response.status(400).json({msg: 'Email username is too long'});
    }
    
    let domainParts = emailParts[1].split('.');
    if (domainParts.some(function(part) {return part.length > 63;})) {
        response.status(400).json({msg: 'Email domain name is too long'});
    }

    next();
}

function isPhoneValid (request, response, next) {
    let phone = request.body.phone;

    if (!phone) {
        response.status(400).json({msg: 'Phone number is required'})
    }

    if (phone.length < 3) {
        response.status(400).json({msg: 'Phone number is too short'})
    }

    if (phone.length > 10) {
        response.status(400).json({msg: 'Phone number is too long'})
    }

    next();

}

function isPasswordValid (request, response, next) {
    let password = request.body.pw;

    //pwRegex: Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character:
    const pwUppercase = /^(?=.*[A-Z])/; 
    const pwLowercase = /^(?=.*[a-z])/; 
    const pwDigit =  /^(?=.*\d)/; 
    const pwSpecialCharacters = /^(?=.*[!#$@^%&?*+,-./:;<=>_`{|}~])/;

    if (!password) {
        response.status(400).json({msg: 'Password field is required'});
    }

    if (password.length < 8) {
        response.status(400).json({msg: 'Password must contain at least 8 characters'});
    }

    let isContainUppercase = pwUppercase.test(password);
    if (!isContainUppercase) {                         
        response.status(400).json({msg: 'Password must contain at least one uppercase letter'});              
    }

    let isContainLowercase = pwLowercase.test(password);
    if (!isContainLowercase) {                         
        response.status(400).json({msg: 'Password must contain at least one lowercase letter'});              
    }

    let isContainDigit = pwDigit.test(password);
    if (!isContainDigit) {
        response.status(400).json({msg: 'Password must contain at least one number'})
    }

    let isContainSpecialCharacter = pwSpecialCharacters.test(password);
    if (!isContainSpecialCharacter) {
        response.status(400).json({msg: 'Password must contain at least one special character'})
    }

    next();
}

module.exports = {
    authMw,
    isUsernameValid,
    isEmailValid,
    isPhoneValid,
    isPasswordValid
}