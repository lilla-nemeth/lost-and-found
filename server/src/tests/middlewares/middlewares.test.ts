import { authMw, isFormValid } from '../../middlewares/middlewares';
import { Response, NextFunction } from 'express';
import * as types from '../../types/requests';
import jwt from 'jsonwebtoken';

afterEach(() => {
	jest.clearAllMocks();
});

// authMw
describe('authMw', () => {
	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should pass the request to the next middleware if a valid token is provided', async () => {
		const token = jwt.sign({ id: 12, isAdmin: true }, 'r4uqSKqC6L');
		const mReq: types.Request = {
			headers: {},
		} as types.Request;
		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		mReq.headers['x-auth-token'] = token;

		await authMw(mReq, mRes, mNext);

		expect(mReq.userId).toBe(12);
		expect(mReq.isAdmin).toBe(true);
		expect(mNext).toHaveBeenCalled();
	});

	it('should return 401 status with "Token is not valid" message if an invalid token is provided', async () => {
		const invalidToken = 'invalid_token';
		const mReq: types.Request = {
			headers: {},
		} as types.Request;
		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		mReq.headers['x-auth-token'] = invalidToken;

		await authMw(mReq, mRes, mNext);

		expect(mRes.status).toHaveBeenCalledWith(401);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'Token is not valid' });
		expect(mNext).not.toHaveBeenCalled();
	});

	it('should return 401 status with "No token found" message if no token is provided', async () => {
		const mReq: types.Request = {
			headers: {},
		} as types.Request;
		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		await authMw(mReq, mRes, mNext);

		expect(mRes.status).toHaveBeenCalledWith(401);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'No token found' });
		expect(mNext).not.toHaveBeenCalled();
	});
});

const usersMockData = [
	{
		id: 1,
		username: 'johndoe',
		email: 'john@doe.com',
		pw: 'test-#Password1',
		phone: '01223426678',
		isAdmin: false,
	},
];

// isFormValid
describe('isFormValid middleware', () => {
	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should call next() if form is valid', async () => {
		const userData = {
			username: usersMockData[0].username,
			email: usersMockData[0].email,
			pw: usersMockData[0].pw,
			phone: usersMockData[0].phone,
		};

		const mReq: types.Request = {
			body: userData,
			headers: {},
		} as types.Request;

		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		await isFormValid(mReq, mRes, mNext);

		expect(mNext).toHaveBeenCalled();
	});

	it('should return status 400 if email is missing', async () => {
		const userData = {
			username: usersMockData[0].username,
			pw: usersMockData[0].pw,
			phone: usersMockData[0].phone,
		};

		const mReq: types.Request = {
			body: userData,
			headers: {},
		} as types.Request;

		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		await isFormValid(mReq, mRes, mNext);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'Email is required.' });
	});

	it('should return status 400 if username is missing', async () => {
		const userData = {
			email: usersMockData[0].email,
			pw: usersMockData[0].pw,
			phone: usersMockData[0].phone,
		};

		const mReq: types.Request = {
			body: userData,
			headers: {},
		} as types.Request;

		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		await isFormValid(mReq, mRes, mNext);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'Username is required.' });
	});

	it('should return status 400 if password is missing', async () => {
		const userData = {
			username: usersMockData[0].username,
			email: usersMockData[0].email,
			phone: usersMockData[0].phone,
		};

		const mReq: types.Request = {
			body: userData,
			headers: {},
		} as types.Request;

		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		await isFormValid(mReq, mRes, mNext);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'Password is required.' });
	});

	it('should return status 400 if phone number is missing', async () => {
		const userData = {
			username: usersMockData[0].username,
			email: usersMockData[0].email,
			pw: usersMockData[0].pw,
		};

		const mReq: types.Request = {
			body: userData,
			headers: {},
		} as types.Request;

		const mRes = mockResponse();
		const mNext: NextFunction = jest.fn();

		await isFormValid(mReq, mRes, mNext);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'Phone number is required.' });
	});
});
