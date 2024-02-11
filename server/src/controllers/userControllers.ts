import { Response } from 'express';
import * as types from '../types/requests';
import bcrypt from 'bcryptjs';
import { isFormValid } from '../middlewares/middlewares';
import models from '../models/index';
import * as messages from '../types/messages';
import { PetInstance, UserInstance } from '../types/models';

// Create
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

export { createUserAccount, deleteUser };
