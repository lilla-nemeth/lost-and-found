import { createUserAccount, signIn, getAllUsers, getUsername, updateUser, deleteUser } from '../../controllers/userControllers';
import { Response } from 'express';
import * as types from '../../types/requests';
import * as messages from '../../types/messages';
import models from '../../models/index';

const usersMockData = [
	{
		id: 1,
		username: 'johndoe',
		email: 'john@doe.com',
		pw: 'test-#Password1',
		phone: '01223426678',
		isAdmin: false,
	},
	{
		id: 2,
		username: 'janedoe',
		email: 'jane@doe.com',
		pw: 'Password2Te$t[3121]',
		phone: '+358412234266',
		isAdmin: false,
	},
];

// createUserAccount
// signIn

// getAllUsers

describe('get all users', () => {
	jest.mock('../../models', () => ({
		User: {
			findAll: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should return all users', async () => {
		const mRes: Response = mockResponse();
		const usersInstances = usersMockData.map((userData) => models.User.build(userData));

		jest.spyOn(models.User, 'findAll').mockResolvedValue(usersInstances);

		await getAllUsers(null, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith(usersInstances);
	});

	it('should return error message if fetching users fails', async () => {
		const mRes: Response = mockResponse();
		const usersInstances = usersMockData.map((userData) => models.User.build(userData));

		(models.User.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

		await getAllUsers(null, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_USERS });
	});
});

// getUsername
describe('get username', () => {
	jest.mock('../../models', () => ({
		User: {
			findByPk: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should return username if user is found', async () => {
		const mReq: any = { userId: 1 };
		const mRes: Response = mockResponse();
		const usersResult = usersMockData;

		// (models.User.findByPk as jest.Mock).mockResolvedValue(usersMockData);
		const usersInstances = usersMockData.map((userData) => models.User.build(userData));
		// console.log(usersInstances);
		jest.spyOn(models.User, 'findByPk').mockResolvedValue(usersInstances[0]);

		await getUsername(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		usersInstances.forEach((user) => {
			expect(mRes.json).toHaveBeenCalledWith(user.username);
		});
	});

	it('should return error message if user is not found', async () => {
		const mReq: any = { userId: 1 };
		const mRes: Response = mockResponse();

		(models.User.findByPk as jest.Mock).mockRejectedValue(new Error('User not found'));

		await getUsername(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_USERNAME });
	});
});

// updateUser
// deleteUser
