import { authMw, isFormValid } from '../../middlewares/middlewares';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

describe('authMw', () => {
	let mReq: any;
	let mRes: Partial<Response>;
	let mNext: jest.Mock;

	beforeEach(() => {
		mReq = { headers: {} } as any;
		mRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as Partial<Response>;
		mNext = jest.fn();
	});

	it('should pass the request to the next middleware if a valid token is provided', async () => {
		const token = jwt.sign({ id: 12, isAdmin: true }, 'r4uqSKqC6L');

		mReq.headers['x-auth-token'] = token;

		await authMw(mReq, mRes as Response, mNext);

		expect(mReq.userId).toBe(12);
		expect(mReq.isAdmin).toBe(true);
		expect(mNext).toHaveBeenCalled();
	});

	it('should return 401 status with "Token is not valid" message if an invalid token is provided', async () => {
		const invalidToken = 'invalid_token';

		mReq.headers['x-auth-token'] = invalidToken;

		await authMw(mReq, mRes as Response, mNext);

		expect(mRes.status).toHaveBeenCalledWith(401);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'Token is not valid' });
		expect(mNext).not.toHaveBeenCalled();
	});

	it('should return 401 status with "No token found" message if no token is provided', async () => {
		await authMw(mReq, mRes as Response, mNext);

		expect(mRes.status).toHaveBeenCalledWith(401);
		expect(mRes.json).toHaveBeenCalledWith({ msg: 'No token found' });
		expect(mNext).not.toHaveBeenCalled();
	});
});
