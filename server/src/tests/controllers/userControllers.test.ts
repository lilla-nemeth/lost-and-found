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

// interface CustomRequest extends types.Request {
// 	body: types.RequestUserBody;
// }

// createUserAccount
describe('create user account', () => {
	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should create user account successfully', async () => {
		const userData = {
			username: usersMockData[0].username,
			email: usersMockData[0].email,
			pw: usersMockData[0].pw,
			phone: usersMockData[0].phone,
		};

		const mReq: types.CustomRequest = {
			body: userData,
			headers: {},
		} as types.CustomRequest;

		const mRes: Response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(bcrypt, 'hashSync').mockReturnValue('$2a$10$mockedHash');

		const mockUserInstance: any = {
			username: userData.username,
			email: userData.email,
			pw: '$2a$10$mockedHash',
			phone: userData.phone,
			isAdmin: false,
		};

		jest.spyOn(models.User, 'create').mockResolvedValueOnce(mockUserInstance);

		await createUserAccount(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({
			...userData,
			pw: '$2a$10$mockedHash',
			isAdmin: false,
		});
	});

	it('should handle used email error', async () => {
		const mReq: types.CustomRequest = {
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as types.CustomRequest;
		const mRes: Response = mockResponse();

		jest.spyOn(bcrypt, 'hashSync').mockReturnValue('$2b$10$b63KmockedHash');
		jest.spyOn(models.User, 'create').mockRejectedValueOnce({ code: '23505', constraint: 'users_email_key' });

		await createUserAccount(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_USED_EMAIL });
	});

	it('should handle used phone error', async () => {
		const mReq: types.CustomRequest = {
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as types.CustomRequest;
		const mRes: Response = mockResponse();

		jest.spyOn(bcrypt, 'hashSync').mockReturnValue('$2b$10$b63KmockedHash');
		jest.spyOn(models.User, 'create').mockRejectedValueOnce({ code: '23505', constraint: 'users_phone_key' });

		await createUserAccount(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_USED_PHONE });
	});

	it('should handle other errors', async () => {
		const mReq: types.CustomRequest = {
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as types.CustomRequest;
		const mRes: Response = mockResponse();

		jest.spyOn(bcrypt, 'hashSync').mockReturnValue('$2b$10$b63KmockedHash');
		jest.spyOn(models.User, 'create').mockRejectedValueOnce(new Error('Some other error'));

		await createUserAccount(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_CREATE_USER });
	});
});

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
	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should update user successfully', async () => {
		const mReq: types.CustomRequest = {
			userId: 1,
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as types.CustomRequest;
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
		const mReq: types.CustomRequest = {
			userId: 1,
			body: {
				username: usersMockData[0].username,
				email: usersMockData[0].email,
				pw: usersMockData[0].pw,
				phone: usersMockData[0].phone,
			},
			headers: {},
		} as types.CustomRequest;

		const mRes: Response = mockResponse();

		jest.spyOn(models.User, 'update').mockRejectedValueOnce(new Error('Update error'));

		await updateUser(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_UPDATE_USER });
	});
});

// deleteUser
describe('delete user', () => {
	it('should delete user successfully', async () => {
		const mockResponse = () => {
			const res: Partial<Response> = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			return res as Response;
		};

		const mReq: types.CustomRequest = {
			userId: 1,
			headers: {},
		} as types.CustomRequest;
		const mockResponseObj: Response = mockResponse();

		jest.spyOn(models.User, 'destroy').mockResolvedValueOnce(1);

		await deleteUser(mReq, mockResponseObj);

		expect(mockResponseObj.status).toHaveBeenCalledWith(200);
		expect(mockResponseObj.json).toHaveBeenCalledWith({ msg: messages.SUCCESS_MSG_DELETED_USER_AND_PETS });
		expect(models.User.destroy).toHaveBeenCalledWith({
			where: {
				id: mReq.userId,
			},
		});
	});

	it('should handle delete error', async () => {
		const mockResponse = () => {
			const res: Partial<Response> = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			return res as Response;
		};

		const mReq: types.CustomRequest = {
			userId: 1,
			headers: {},
		} as types.CustomRequest;
		const mockResponseObj: Response = mockResponse();

		jest.spyOn(models.User, 'destroy').mockRejectedValueOnce(new Error('Delete error'));

		await deleteUser(mReq, mockResponseObj);

		expect(mockResponseObj.status).toHaveBeenCalledWith(400);
		expect(mockResponseObj.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_DELETE_USER });
	});
});
