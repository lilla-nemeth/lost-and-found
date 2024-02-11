import { Response } from 'express';
import * as types from '../types/requests';
import bcrypt from 'bcryptjs';
import { isFormValid } from '../middlewares/middlewares';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import * as messages from '../types/messages';
import { UserInstance } from '../types/models';

// CREATE
const createUserAccount = async (request: types.Request, response: Response): Promise<void> => {
	const username: types.RequestUserBody['username'] = request.body.username as string;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone as string;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user: Promise<UserInstance> = models.User.create({
		username,
		email,
		pw: encryptedPw,
		phone,
		isAdmin: false,
	});

	user
		.then((data) => {
			response.status(200).json(data.save());
		})
		.catch((err: any) => {
			if (err.code === '23505' && err.constraint === 'users_email_key') {
				response.status(400).json({ msg: messages.ERROR_MSG_USED_EMAIL });
			} else if (err.code === '23505' && err.constraint === 'users_phone_key') {
				response.status(400).json({ msg: messages.ERROR_MSG_USED_PHONE });
			} else if (err.code != '23505' && isFormValid) {
				isFormValid;
			}
		});
};

// READ
const signIn = async (request: types.Request, response: Response): Promise<void> => {
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;

	const user: Promise<UserInstance[]> = models.User.findAll({
		where: {
			email,
		},
	});

	user
		.then((data: any) => {
			const userData = data[0];
			const encryptedPw = userData.pw;

			data &&
				bcrypt.compare(pw, encryptedPw).then((isMatch) => {
					if (isMatch) {
						jwt.sign({ id: userData.id, isAdmin: userData.isAdmin }, 'r4uqSKqC6L', (err: any, token: any) => {
							response.status(200).json(token);
						});
					} else {
						response.status(403).json({ msg: messages.ERROR_MSG_INCORRECT_PASSWORD });
					}
				});
		})
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_NOT_FOUND_USER }));
};

// get all users from users table, however currently the data is used for pet profiles
const getAllUsers = async (request: null, response: Response): Promise<void> => {
	const users: Promise<UserInstance[]> = models.User.findAll();

	users
		.then((data) => {
			response.status(200).json(data);
		})
		.catch(() => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERS });
		});
};

// get username
const getUsername = async (request: types.Request, response: Response): Promise<void> => {
	const id: types.Request['userId'] = request.userId;

	const user: Promise<UserInstance | null> = models.User.findByPk(id);

	console.log(user);
	user
		.then((data: any) => {
			response.status(200).json(data.username);
		})
		.catch(() => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERNAME });
		});
};

// UPDATE
// edit user data (Dashboard)
const updateUser = async (request: types.Request, response: Response): Promise<void> => {
	const id: types.Request['userId'] = request.userId;
	const username: types.RequestUserBody['username'] = request.body.username;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user: Promise<[affectedCount: number]> = models.User.update(
		{
			username,
			email,
			pw: encryptedPw,
			phone,
		},
		{
			where: {
				id,
			},
		}
	);
	user
		.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_USER }))
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_USER }));
};

// DELETE
// delete user - delete user and the connected pets (Dashboard)
const deleteUser = async (request: types.Request, response: Response): Promise<void> => {
	const userId: types.Request['userId'] = request.userId;

	const user: Promise<number> = models.User.destroy({
		where: {
			id: userId,
		},
	});

	user
		.then(() => {
			response.status(200).json({
				msg: messages.SUCCESS_MSG_DELETED_USER_AND_PETS,
			});
		})
		.catch(() => {
			response.status(400).json({ msg: messages.ERROR_MSG_DELETE_USER });
		});
};

export { createUserAccount, signIn, getAllUsers, getUsername, updateUser, deleteUser };
