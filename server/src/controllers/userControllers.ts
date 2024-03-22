import { Response } from 'express';
import * as types from '../types/requests';
import bcrypt from 'bcryptjs';
import { isFormValid } from '../middlewares';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import * as messages from '../types/messages';
import { UserInstance } from '../types/models';

// CREATE
const createAccount = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const username: types.RequestUserBody['username'] = request.body.username as string;
		const email: types.RequestUserBody['email'] = request.body.email;
		const pw: types.RequestUserBody['pw'] = request.body.pw;
		const phone: types.RequestUserBody['phone'] = request.body.phone as string;
		const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

		const user: UserInstance = await models.User.create({
			username,
			email,
			pw: encryptedPw,
			phone,
			isAdmin: false,
		});

		response.status(200).json(user);
	} catch (error: any) {
		if (error.code === '23505' && error.constraint === 'users_email_key') {
			response.status(400).json({ msg: messages.ERROR_MSG_USED_EMAIL });
		} else if (error.code === '23505' && error.constraint === 'users_phone_key') {
			response.status(400).json({ msg: messages.ERROR_MSG_USED_PHONE });
		} else if (error.code !== '23505' && isFormValid) {
			isFormValid;
		}
		response.status(400).json({ msg: messages.ERROR_MSG_CREATE_USER });
	}
};

// READ
const signIn = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const email: types.RequestUserBody['email'] = request.body.email;
		const pw: types.RequestUserBody['pw'] = request.body.pw;

		const users: UserInstance[] = await models.User.findAll({
			where: { email },
		});

		const userData = users[0];
		const encryptedPw = userData.pw;

		const isMatch = await bcrypt.compare(pw, encryptedPw);

		if (isMatch) {
			jwt.sign({ id: userData.id, isAdmin: userData.isAdmin }, 'r4uqSKqC6L', (err: any, token: any) => {
				response.status(200).json(token);
			});
		} else {
			response.status(403).json({ msg: messages.ERROR_MSG_INCORRECT_PASSWORD });
		}
	} catch (error) {
		response.status(400).json({ msg: messages.ERROR_MSG_NOT_FOUND_USER });
	}
};

// get all users from users table, however currently the data is used for pet profiles
const getAllUsers = async (request: types.Request | null, response: Response): Promise<void> => {
	try {
		const users: UserInstance[] = await models.User.findAll();
		response.status(200).json(users);
	} catch (error) {
		response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERS });
	}
};

// get username
const getUsername = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const id: types.Request['userId'] = request.userId;
		const user: UserInstance | null = await models.User.findByPk(id);
		response.status(200).json(user?.username);
	} catch (error) {
		response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERNAME });
	}
};

// UPDATE
// edit user data (Dashboard)
const updateUser = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const id: types.Request['userId'] = request.userId;
		const username: types.RequestUserBody['username'] = request.body.username;
		const email: types.RequestUserBody['email'] = request.body.email;
		const pw: types.RequestUserBody['pw'] = request.body.pw;
		const phone: types.RequestUserBody['phone'] = request.body.phone;
		const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

		await models.User.update(
			{
				username,
				email,
				pw: encryptedPw,
				phone,
			},
			{
				where: { id },
			}
		);

		response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_USER });
	} catch (error) {
		response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_USER });
	}
};

// DELETE
// delete user - delete user and the connected pets (Dashboard)
const deleteUser = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const userId: types.Request['userId'] = request.userId;
		await models.User.destroy({
			where: { id: userId },
		});
		response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_USER_AND_PETS });
	} catch (error) {
		response.status(400).json({ msg: messages.ERROR_MSG_DELETE_USER });
	}
};

export { createAccount, signIn, getAllUsers, getUsername, updateUser, deleteUser };
