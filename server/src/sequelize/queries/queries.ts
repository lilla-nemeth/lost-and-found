import { Request, Response } from 'express';
import * as types from '../../types/requests';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import url, { fileURLToPath } from 'url';
import { isFormValid } from '../../middlewares/middlewares';
import models from '../models/index';
import * as messages from '../../types/messages';

dotenv.config({ path: '../../../.env' });

const createUserAccount = (request: Request, response: Response) => {
	const username: types.RequestUserBody['username'] = request.body.username as string;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone as string;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user = models.User.create({
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
		.catch((err) => {
			if (err.code === '23505' && err.constraint === 'users_email_key') {
				response.status(400).json({ msg: messages.ERROR_MSG_USED_EMAIL });
			} else if (err.code === '23505' && err.constraint === 'users_phone_key') {
				response.status(400).json({ msg: messages.ERROR_MSG_USED_PHONE });
			} else if (err.code != '23505' && isFormValid) {
				isFormValid;
			}
		});
};

const signIn = (request: Request, response: Response) => {
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
const getAllUsers = (request: Request, response: Response) => {
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
const getPetsByPagination = (request: Request, response: Response) => {
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

// report pet by user
// TODO: fix this (removing any):
const createPetProfile = (request: types.RequestGetPetUserId | any, response: Response) => {
	const userId: types.RequestGetPetUserId['userId'] = request.userId;
	// TODO: fix this:
	const img: any = request.file.buffer.toString('base64');
	// const img: types.Request['file'] = request.file.buffer.toString('base64');
	// TODO: testing without as string option:
	const petstatus: types.RequestPetBody['petstatus'] = request.body.petstatus;
	const petlocation: types.RequestPetBody['petlocation'] = request.body.petlocation;
	const longitude: types.RequestPetBody['longitude'] = request.body.longitude;
	const latitude: types.RequestPetBody['latitude'] = request.body.latitude;
	const species: types.RequestPetBody['species'] = request.body.species;
	const petsize: types.RequestPetBody['petsize'] = request.body.petsize as string;
	const breed: types.RequestPetBody['breed'] = request.body.breed as string;
	const sex: types.RequestPetBody['sex'] = request.body.sex as string;
	const color: types.RequestPetBody['color'] = request.body.color as string;
	const age: types.RequestPetBody['age'] = request.body.age as string;
	const uniquefeature: types.RequestPetBody['uniquefeature'] = request.body.uniquefeature as string;
	const postdescription: types.RequestPetBody['postdescription'] = request.body.postdescription;

	const pet = models.Pet.create({
		userId,
		img,
		petstatus,
		petlocation,
		longitude,
		latitude,
		species,
		petsize,
		breed,
		sex,
		color,
		age,
		uniquefeature,
		postdescription,
	});

	pet
		.then((data) => {
			response.status(200).json(data.save());
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_CREATE_PET });
		});
};

// get all pets by userId
const getAllUserPets = (request: types.RequestUserPets, response: Response) => {
	const userId: types.RequestUserPets['userId'] = request.userId;
	const isAdmin: types.RequestUserPets['isAdmin'] = request.isAdmin;

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
			.then((data) => {
				response.status(200).json(data);
			})
			.catch(() => {
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

// delete 1 pet by user (user dashboard)
const deleteUserPet = (request: Request, response: Response) => {
	const paramsId: types.RequestGetPetIdParams['id'] = request.params.id;

	const id = Number(paramsId);

	const pet = models.Pet.destroy({
		where: {
			id: id,
		},
	});

	pet
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PET }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PET }));
};

// delete all pets by user (user dashboard)
const deleteAllUserPets = (request: types.RequestUserPets, response: Response) => {
	const userId: types.RequestUserPets['userId'] = request.userId;
	const isAdmin: types.RequestUserPets['isAdmin'] = request.isAdmin;

	const userPetList = models.Pet.destroy({
		truncate: true,
		where: {
			userId,
		},
	});

	const adminPetList = models.Pet.destroy({ truncate: true });

	if (isAdmin) {
		adminPetList
			.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS }))
			.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
	} else {
		userPetList
			.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS }))
			.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
	}
};

// get username
const getUsername = (request: any, response: Response) => {
	const userId: types.RequestGetPetUserId['userId'] = request.userId;

	const user = models.User.findByPk(userId);

	user
		.then((data: any) => {
			response.status(200).json(data.username);
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERNAME });
		});
};

// search pet location
const getGeocodeLocation = (request: Request, response: Response) => {
	// TODO: make type definition
	const query = request.params.query;

	const params = new URLSearchParams({
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

///////////////////////////////////////////

// edit pet by user (user dashboard)
const updatePet = (request: Request, response: Response) => {
	const id: types.RequestGetPetIdParams['id'] = request.params.id;
	const petstatus: types.RequestPetBody['petstatus'] = request.body.petstatus;
	const petlocation: types.RequestPetBody['petlocation'] = request.body.petlocation;
	const longitude: types.RequestPetBody['longitude'] = request.body.longitude;
	const latitude: types.RequestPetBody['latitude'] = request.body.latitude;
	const species: types.RequestPetBody['species'] = request.body.species;
	const petsize: types.RequestPetBody['petsize'] = request.body.petsize;
	const breed: types.RequestPetBody['breed'] = request.body.breed;
	const sex: types.RequestPetBody['sex'] = request.body.sex;
	const color: types.RequestPetBody['color'] = request.body.color;
	const age: types.RequestPetBody['age'] = request.body.age;
	const uniquefeature: types.RequestPetBody['uniquefeature'] = request.body.uniquefeature;
	const postdescription: types.RequestPetBody['postdescription'] = request.body.postdescription;

	const pet = models.Pet.update(
		{
			petstatus,
			petlocation,
			longitude,
			latitude,
			species,
			petsize,
			breed,
			sex,
			color,
			age,
			uniquefeature,
			postdescription,
		},
		{
			where: {
				id,
			},
		}
	);

	pet
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_PET }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_PET }));
};

// edit user data (user dashboard)
const updateUser = (request: types.RequestGetPetUserId, response: Response) => {
	const id: types.RequestGetPetUserId['userId'] = request.userId;
	const username: types.RequestUserBody['username'] = request.body.username;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user = models.User.update(
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
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_USER }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_USER }));
};

// delete user - delete user and the connected pets (user dashboard)
const deleteUser = (request: types.RequestGetPetUserId, response: Response) => {
	const userId: types.RequestGetPetUserId['userId'] = request.userId;

	const pet = models.Pet.destroy({
		where: {
			userId,
		},
	});

	const user = models.User.destroy({
		where: {
			id: userId,
		},
	});

	pet
		.then((res) => {
			user
				.then((res) => {
					response.status(200).json({
						msg: messages.SUCCESS_MSG_DELETED_USER_AND_PETS,
					});
				})
				.catch((err) => {
					response.status(400).json({ msg: messages.ERROR_MSG_DELETE_USER });
				});
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS });
		});
};

// from pets table get one pet by id
const getPetById = (request: Request, response: Response) => {
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

export {
	getUsername,
	getAllUsers,
	getAllUserPets,
	getPetsByPagination,
	getPetById,
	getGeocodeLocation,
	updatePet,
	updateUser,
	deleteUserPet,
	deleteAllUserPets,
	deleteUser,
	createUserAccount,
	signIn,
	createPetProfile,
	getAll,
};
