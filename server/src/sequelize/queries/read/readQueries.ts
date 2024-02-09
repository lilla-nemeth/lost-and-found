import { Request, Response } from 'express';
import * as types from '../../../types/requests';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import url, { fileURLToPath } from 'url';
import models from '../../models/index';
import * as messages from '../../../types/messages';

dotenv.config({ path: '../../../../.env' });

const signIn = (request: types.Request, response: Response) => {
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;

	const user = models.User.findAll({
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
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_NOT_FOUND_USER });
		});
};

// get all users
const getAllUsers = (request: types.Request, response: Response) => {
	const users = models.User.findAll();

	users
		.then((data) => {
			response.status(200).json(data);
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERS });
		});
};

// get/fetch pets by pagination, data has data.rows (pet objects) and data.count (total)
const getPetsByPagination = (request: types.Request, response: Response) => {
	const skip: types.RequestPaginationParams['skip'] = request.params.skip;
	const fetch: types.RequestPaginationParams['fetch'] = request.params.fetch;

	const offset = Number(skip);
	const limit = Number(fetch);

	const pets = models.Pet.findAndCountAll({
		order: [['since', 'DESC']],
		offset,
		limit,
	});
	pets
		.then((data) => {
			response.status(200).json(data);
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_PETS });
		});
};

// from pets table get one pet by id
const getPetById = (request: types.Request, response: Response) => {
	const id: types.RequestGetPetIdParams['id'] = request.params.id;

	const pet = models.Pet.findByPk(id);

	pet
		.then((data: any) => {
			response.status(200).json(data.rows);
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
		});
};

// get all pets by userId
const getAllUserPets = (request: types.Request, response: Response) => {
	const userId: types.Request['userId'] = request.userId;
	const isAdmin: types.Request['isAdmin'] = request.isAdmin;

	const userPetList = models.Pet.findAll({
		order: [['since', 'DESC']],
		where: {
			userId,
		},
	});

	const adminPetList = models.Pet.findAll({
		order: [['since', 'DESC']],
	});

	if (isAdmin) {
		adminPetList
			.then((data: any) => {
				response.status(200).json(data);
			})
			.catch((err: any) => {
				response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
			});
	} else {
		userPetList
			.then((data) => {
				response.status(200).json(data);
			})
			.catch(() => {
				response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
			});
	}
};

// get username
const getUsername = (request: types.Request, response: Response) => {
	const id: types.Request['userId'] = request.userId;

	const user = models.User.findByPk(id);

	console.log(user);
	user
		.then((data: any) => {
			response.status(200).json(data.username);
		})
		.catch((err: any) => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERNAME });
		});
};

// search pet location
const getGeocodeLocation = (request: types.Request, response: Response) => {
	const query: types.RequestGetSearchParamsQuery['query'] = request.params.query;

	const params: url.URLSearchParams = new URLSearchParams({
		access_token: process.env.API_KEY!,
		...url.parse(request.url, true).query,
	});
	const result = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`;

	axios
		.get(result)
		.then((res) => {
			response.status(200).json(res.data);
		})
		.catch((err) => {
			response.status(500).json({ error: err.message });
		});
};

const getAll = (request: Request, response: Response) => {
	const __filename: string = fileURLToPath(import.meta.url);
	const __dirname: string = dirname(__filename);
	response.sendFile(path.join(__dirname, 'client/build/index.html'));
};

export { signIn, getAllUsers, getPetsByPagination, getAllUserPets, getUsername, getGeocodeLocation, getAll, getPetById };
