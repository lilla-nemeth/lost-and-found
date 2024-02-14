import { createUserAccount, signIn, getAllUsers, getUsername, updateUser, deleteUser } from '../../controllers/userControllers';
import { Response } from 'express';
import * as types from '../../types/requests';
import * as messages from '../../types/messages';
import models from '../../models/index';
import { UserInstance } from 'types/models';
import bcrypt from 'bcryptjs';

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
		const mockUser: UserInstance | null = { id: 1, username: 'johndoe' } as UserInstance;

		jest.spyOn(models.User, 'findByPk').mockResolvedValueOnce(mockUser);

		await getUsername(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith('johndoe');
	});

	it('should return error message if user is not found', async () => {
		const mReq: any = { userId: 267 };
		const mRes: Response = mockResponse();

		jest.spyOn(models.User, 'findByPk').mockResolvedValueOnce(null);

		await getUsername(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_USERNAME });
	});
});

// updateUser
describe('update user', () => {
	interface CustomRequest extends types.Request {
		body: types.RequestUserBody;
	}

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should update user successfully', async () => {
		const mReq: CustomRequest = {
			userId: 1,
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as CustomRequest;
		const mRes: Response = mockResponse();

		jest.spyOn(bcrypt, 'hashSync').mockReturnValue('$2b$10$b63KmockedHash');
		jest.spyOn(models.User, 'update').mockResolvedValueOnce([1]);

		await updateUser(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.SUCCESS_MSG_UPDATED_USER });
		expect(models.User.update).toHaveBeenCalledWith(
			{
				username: mReq.body.username,
				email: mReq.body.email,
				pw: '$2b$10$b63KmockedHash',
				phone: mReq.body.phone,
			},
			{
				where: {
					id: mReq.userId,
				},
			}
		);
	});

	it('should handle update error', async () => {
		const mReq: CustomRequest = {
			userId: 1,
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as CustomRequest;

		const mRes: Response = mockResponse();

		jest.spyOn(models.User, 'update').mockRejectedValueOnce(new Error('Update error'));

		await updateUser(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_UPDATE_USER });
	});
});

// deleteUser
