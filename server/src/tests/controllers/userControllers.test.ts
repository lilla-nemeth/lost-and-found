import { createUserAccount, signIn, getAllUsers, getUsername, updateUser, deleteUser } from '../../controllers/userControllers';
import { Response } from 'express';
import * as types from '../../types/requests';
import * as messages from '../../types/messages';
import models from '../../models/index';

// createUserAccount
// signIn

// getAllUsers
jest.mock('../../models', () => ({
	User: {
		findAll: jest.fn() as jest.Mock,
	},
}));

const mockResponse = () => {
	const res: Partial<Response> = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};
	return res as Response;
};

const usersMockData = [
	{
		id: '1',
		username: 'johndoe',
		email: 'john@doe.com',
		pw: 'test-#Password1',
		phone: '01223426678',
		isAdmin: 'false',
	},
	{
		id: '2',
		username: 'janedoe',
		email: 'jane@doe.com',
		pw: 'Password2Te$t[3121]',
		phone: '+358412234266',
		isAdmin: 'false',
	},
];

describe('get all users', () => {
	it('should return all users', async () => {
		const mRes: Response = mockResponse();
		const usersResult = usersMockData;

		(models.User.findAll as jest.Mock).mockResolvedValue(usersResult);

		await getAllUsers(null, mRes);
		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith(usersResult);
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
// updateUser
// deleteUser
