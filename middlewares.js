import jwt from 'jsonwebtoken';
import multer from 'multer';

let DEBUG = false;

function authMw(request, response, next) {
	let token = request.headers['x-auth-token'];

	if (token) {
		jwt.verify(token, 'r4uqSKqC6L', (err, decodedToken) => {
			if (decodedToken) {
				request.userId = decodedToken.id;
				request.isadmin = decodedToken.isadmin;
				next();
			} else {
				response.status(401).json({ msg: 'Token is not valid' });
			}
		});
	} else {
		response.status(401).json({ msg: 'No token found' });
	}
}

function isFormValid(request, response, next) {
	let email = request.body.email;
	let password = request.body.pw;
	let username = request.body.username;
	let phone = request.body.phone;

	const usernameRegex = /^[A-Za-z0-9öÖäÄåÅ_\.]*$/;
	const usernameFirstCharacter = /^[a-zA-ZöÖäÄåÅ]/;
	const emailRegex =
		/^[-!#$%&'.*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
	const phoneRegex = /^\d+$/;
	const pwUppercase = /^(?=.*[A-Z])/;
	const pwLowercase = /^(?=.*[a-z])/;
	const pwDigit = /^(?=.*\d)/;
	const pwAllowedSpecialCharacters = /^(?=.*[§đ½¡”»£¤«“‰„‚\/\\°¿´˛¸€ÞþıŒœ ̛˚˝¯¨əßÐðĸøØÆæ'˘><Ʒʒ·×Ŋŋ—µ,‘’˙–~@#$%^&*+=`|{}:;!.?_\"()\[\]-])/;

	let validByEmailRegex = emailRegex.test(email);
	let emailParts = email.split('@');
	let domainParts = emailParts[1].split('.');
	let isFirstCharacterPassTheTest = usernameFirstCharacter.test(username);
	let validByUsernameRegex = usernameRegex.test(username);
	let validByPhoneRegex = phoneRegex.test(phone);
	let isContainUppercase = pwUppercase.test(password);
	let isContainLowercase = pwLowercase.test(password);
	let isContainDigit = pwDigit.test(password);
	let isContainSpecialCharacter = pwAllowedSpecialCharacters.test(password);
	let message = '';

	if (!username && !phone) {
		// login
		if (!email) {
			message = 'Email field is required';
		} else if (!validByEmailRegex) {
			message = 'Email format is not valid';
		} else if (!password) {
			message = 'Password field is required';
		}
	} else {
		// signUp
		if (!email) {
			message = 'Email field is required';
		} else if (!validByEmailRegex) {
			message = 'Email format is not valid';
		} else if (email.length > 254) {
			message = 'Email length exceeds the maximum';
		} else if (emailParts[0].length > 64) {
			message = 'Email username is too long';
		} else if (
			domainParts.some(function (part) {
				return part.length > 63;
			})
		) {
			message = 'Email domain name is too long';
		} else if (!username) {
			message = 'Username field is required';
		} else if (username.length < 2) {
			message = 'Username must contain at least 2 characters';
		} else if (username.length > 29) {
			message = 'Username must be less than 30 characters';
		} else if (!isFirstCharacterPassTheTest) {
			message = 'Username must start with a letter';
		} else if (!validByUsernameRegex) {
			message = 'Username contains invalid characters';
		} else if (!phone) {
			message = 'Phone number is required';
		} else if (!validByPhoneRegex) {
			message = 'Phone number must contain only digits';
		} else if (phone.length < 3) {
			message = 'Phone number is too short (min. 3 digits)';
		} else if (phone.length > 15) {
			message = 'Phone number is too long (max. 15 digits)';
		} else if (!password) {
			message = 'Password field is required';
		} else if (password.length < 8) {
			message = 'Password must contain at least 8 characters';
		} else if (!isContainUppercase) {
			message = 'Password must contain at least one uppercase letter';
		} else if (!isContainLowercase) {
			message = 'Password must contain at least one lowercase letter';
		} else if (!isContainDigit) {
			message = 'Password must contain at least one digit';
		} else if (!isContainSpecialCharacter) {
			message = 'Password must contain at least one special character';
		}
	}

	if (message != '') {
		return response.status(400).json({ msg: message });
	} else {
		next();
	}
}

const upload = multer();

export { authMw, isFormValid, upload };
