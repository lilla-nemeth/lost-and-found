import { Request, Response, NextFunction } from 'express';
import * as types from '../types/requests';
import jwt from 'jsonwebtoken';
import multer from 'multer';

let DEBUG = false;

const authMw = async (request: types.Request, response: Response, next: NextFunction): Promise<void> => {
	let token = request.headers['x-auth-token'];

	if (token) {
		jwt.verify(token, 'r4uqSKqC6L', (err: any, decodedToken: any) => {
			if (decodedToken) {
				request.userId = decodedToken.id;
				request.isAdmin = decodedToken.isAdmin;
				next();
			} else {
				response.status(401).json({ msg: 'Token is not valid' });
			}
		});
	} else {
		response.status(401).json({ msg: 'No token found' });
	}
};

const isFormValid = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
	const email: types.RequestUserBody['email'] = request.body.email;
	const password: types.RequestUserBody['pw'] = request.body.pw;
	const username: types.RequestUserBody['username'] = request.body.username as string;
	const phone: types.RequestUserBody['phone'] = request.body.phone as string;

	const usernameRegex: RegExp = /^[A-Za-z0-9öÖäÄåÅ_\.]*$/;
	const usernameFirstCharacter: RegExp = /^[a-zA-ZöÖäÄåÅ]/;
	const emailRegex: RegExp =
		/^[-!#$%&'.*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
	const phoneRegex: RegExp = /^(\+?\d{1,3}|\d{1,4})\d+/;
	const pwUppercase: RegExp = /^(?=.*[A-Z])/;
	const pwLowercase: RegExp = /^(?=.*[a-z])/;
	const pwDigit: RegExp = /^(?=.*\d)/;
	const pwAllowedSpecialCharacters: RegExp =
		/^(?=.*[§đ½¡”»£¤«“‰„‚\/\\°¿´˛¸€ÞþıŒœ ̛˚˝¯¨əßÐðĸøØÆæ'˘><Ʒʒ·×Ŋŋ—µ,‘’˙–~@#$%^&*+=`|{}:;!.?_\"()\[\]-])/;

	const validByEmailRegex = emailRegex.test(email);
	const emailParts = email.split('@');
	const domainPart = emailParts[1].split('.');
	const checkDomainPartLength =
		domainPart &&
		domainPart.some(function (part: string) {
			return part.length > 63;
		});
	const isFirstCharacterPassTheTest = usernameFirstCharacter.test(username);
	const validByUsernameRegex = usernameRegex.test(username);
	const validByPhoneRegex = phoneRegex.test(phone);
	const uppercase = pwUppercase.test(password);
	const lowercase = pwLowercase.test(password);
	const digits = pwDigit.test(password);
	const specialChars = pwAllowedSpecialCharacters.test(password);
	const fieldIsRequired: string = 'is required.';
	let message: string = '';

	if (!username && !phone) {
		// login
		if (!password) {
			message = `Password ${fieldIsRequired}`;
		}

		if (!email) {
			message = `Email ${fieldIsRequired}`;
		} else if (!validByEmailRegex) {
			message = 'Email format is not valid';
		}
	} else {
		// signUp
		if (!email) {
			message = `Email ${fieldIsRequired}`;
		} else if (!validByEmailRegex) {
			message = 'Email format is not valid';
		} else if (email.length > 254) {
			message = 'Email length exceeds the maximum';
		} else if (emailParts[0].length > 64) {
			message = 'Email username is too long';
		} else if (checkDomainPartLength) {
			message = 'Email domain is too long';
		}

		if (!username) {
			message = `Username ${fieldIsRequired}`;
		} else if (username.length < 2) {
			message = 'Username must contain at least 2 characters';
		} else if (username.length > 29) {
			message = 'Username must be less than 30 characters';
		} else if (!isFirstCharacterPassTheTest) {
			message = 'Username must start with a letter';
		} else if (!validByUsernameRegex) {
			message = 'Username contains invalid characters';
		}

		if (!phone) {
			message = `Phone number ${fieldIsRequired}`;
		} else if (!validByPhoneRegex) {
			message = 'Phone number contains invalid characters';
		} else if (phone.length < 3) {
			message = 'Phone number is too short (min. 3 digits)';
		} else if (phone.length > 15) {
			message = 'Phone number is too long (max. 15 digits)';
		}

		if (!password) {
			message = `Password ${fieldIsRequired}`;
		} else if (password.length < 8) {
			message = 'Password must contain at least 8 characters';
		} else if (!uppercase) {
			message = 'Password must contain at least one uppercase letter';
		} else if (!lowercase) {
			message = 'Password must contain at least one lowercase letter';
		} else if (!digits) {
			message = 'Password must contain at least one digit';
		} else if (!specialChars) {
			message = 'Password must contain at least one special character';
		}
	}

	if (message !== '') {
		response.status(400).json({ msg: message });
	} else {
		next();
	}
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export { authMw, isFormValid, upload };
