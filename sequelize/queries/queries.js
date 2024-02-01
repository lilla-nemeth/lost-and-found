import pg from 'pg';
import * as messages from '../../types/messageTypes.js';
import * as queries from '../../types/queryTypes.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import url from 'url';
import { fileURLToPath } from 'url';

import Pet from '../models/pet.js';
import User from '../models/index.js';

dotenv.config();

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

const devSettings = {
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
};

const prodSettings = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: process.env.NODE_ENV === 'production' ? false : true,
	},
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? prodSettings : devSettings);

// get all pets by userid
const getAllUserPets = (request, response) => {
	const userid = request.userid;
	const isadmin = request.isadmin;
	const adminQuery = queries.SELECT_PETS_BY_DESC_DATE;
	const userQuery = queries.SELECT_PETS_BY_USER;

	pool
		.query(isadmin ? adminQuery : userQuery, [userid])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS }));
};

const getAllPets = (request, response) => {
	pool
		.query(queries.SELECT_PETS_BY_DESC_DATE)
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_ALL_PETS }));
};

// get all pets
// const getAllPets = (request, response) => {
// 	const pets = Pet.findAll({
// 		order: [['since', 'DESC']],
// 	});

// 	Promise()
// 		.then((res) => {
// 			console.log('all pets ----------------------');
// 			response.status(200).json(pets);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_ALL_PETS });
// 		});
// 	// try {
// 	// 	const pets = await Pet.findAll({
// 	// 		order: [['since', 'DESC']],
// 	// 	});

// 	// 	response.status(200).json(pets);
// 	// } catch (err) {
// 	// 	response.status(400).json({ msg: messages.ERROR_MSG_FETCH_ALL_PETS });
// 	// }
// };

// get/fetch limited amount of pets to pagination
const getPetsByPagination = (request, response) => {
	const limit = request.params.fetch;
	const offset = request.params.skip;

	pool
		.query(queries.SELECT_PETS_BY_PAGINATION, [limit, offset])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_PETS }));
};

// get the total amount (number) of pets
const getTotalNumberOfPets = (request, response) => {
	pool
		.query(queries.SELECT_TOTAL_NUM_OF_PETS)
		.then((res) => response.status(200).json(res.rows[0].count))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_TOTAL_PETS }));
};

// from pets table get one pet by id
const getPetById = (request, response) => {
	const id = request.params.id;

	pool
		.query(queries.SELECT_PET_BY_ID, [id])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_PET }));
};

// get username
const getUsername = (request, response) => {
	const id = request.userid;

	pool
		.query(queries.SELECT_USER_BY_ID, [id])
		.then((res) => response.status(200).json(res.rows[0].username))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERNAME }));
};

// get all users
const getAllUsers = (request, response) => {
	pool
		.query(queries.SELECT_ALL_USERS)
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER }));
};

// search pet location
const getGeocodeLocation = (request, response) => {
	const query = request.params.query;
	const params = new URLSearchParams({
		access_token: process.env.API_KEY,
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

// edit pet by user (user dashboard)
const updatePetData = (request, response) => {
	const id = request.params.id;
	const petstatus = request.body.petstatus;
	const petlocation = request.body.petlocation;
	const longitude = request.body.longitude;
	const latitude = request.body.latitude;
	const species = request.body.species;
	const petsize = request.body.petsize;
	const breed = request.body.breed;
	const sex = request.body.sex;
	const color = request.body.color;
	const age = request.body.age;
	const uniquefeature = request.body.uniquefeature;
	const postdescription = request.body.postdescription;

	pool
		.query(queries.UPDATE_PET, [
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
			id,
		])
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_PET }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USERERROR_MSG_UPDATE_PET }));
};

// edit user data (user dashboard)
const updateUserData = (request, response) => {
	let id = request.userid;
	let username = request.body.username;
	let email = request.body.email;
	let pw = request.body.pw;
	let phone = request.body.phone;
	let encryptedPw = bcrypt.hashSync(pw, 10);

	pool
		.query(queries.UPDATE_USER, [username, email, encryptedPw, phone, id])
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_USER }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_USER }));
};

// delete 1 pet by user (user dashboard)
const deleteUserPet = (request, response) => {
	let id = request.params.id;

	pool
		.query(queries.DELETE_PET_BY_ID, [id])
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PET }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PET }));
};

// delete all pets by user (user dashboard)
const deleteAllUserPets = (request, response) => {
	let userid = request.userid;
	let isadmin = request.isadmin;

	let adminQuery = queries.DELETE_ALL_PETS;
	let userQuery = queries.DELETE_PET_BY_USER;

	pool
		.query(isadmin ? adminQuery : userQuery, [userid])
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
};

// delete user - delete user and the connected pets (user dashboard)
const deleteUser = (request, response) => {
	let userid = request.userid;

	pool
		.query(queries.DELETE_PET_BY_USER, [userid])
		.then((res) => {
			pool
				.query(queries.DELETE_USER_BY_ID, [userid])
				.then((res) =>
					response.status(200).json({
						msg: messages.SUCCESS_MSG_DELETED_USER_AND_PETS,
					})
				)
				.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_USER }));
		})
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
};

const createAccount = (request, response) => {
	let username = request.body.username;
	let email = request.body.email;
	let pw = request.body.pw;
	let phone = request.body.phone;
	let encryptedPw = bcrypt.hashSync(pw, 10);

	pool
		.query(queries.INSERT_USER_VALUES, [username, email, encryptedPw, phone])
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_CREATED_USER }))
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

const signIn = (request, response) => {
	let email = request.body.email;
	let pw = request.body.pw;

	pool
		.query(queries.SELECT_USER_BY_EMAIL, [email])
		.then((res) => {
			let userObject = res.rows[0];
			let encryptedPw = userObject.pw;

			res.rows &&
				bcrypt.compare(pw, encryptedPw).then((isMatch) => {
					if (isMatch) {
						jwt.sign({ id: userObject.id, isadmin: userObject.isadmin }, 'r4uqSKqC6L', (err, token) => {
							response.status(200).json(token);
						});
					} else {
						response.status(403).json({ msg: messages.ERROR_MSG_INCORRECT_PASSWORD });
					}
				});
		})
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_NOT_FOUND_USER }));
};

// report pet by user
const createPetProfile = (request, response) => {
	const userid = request.userid;
	const img = request.file.buffer.toString('base64');
	const petstatus = request.body.petstatus;
	const petlocation = request.body.petlocation;
	const longitude = request.body.longitude;
	const latitude = request.body.latitude;
	const species = request.body.species;
	const petsize = request.body.petsize;
	const breed = request.body.breed;
	const sex = request.body.sex;
	const color = request.body.color;
	const age = request.body.age;
	const uniquefeature = request.body.uniquefeature;
	const postdescription = request.body.postdescription;

	pool
		.query(queries.INSERT_PET_VALUES, [
			userid,
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
		])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => {
			console.log(err);
			response.status(400).json({ msg: messages.ERROR_MSG_CREATE_PET });
		});
};

const getAll = (request, response) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	response.sendFile(path.join(__dirname, 'client/build/index.html'));
};

export {
	getAllUserPets,
	getAllPets,
	getPetsByPagination,
	getTotalNumberOfPets,
	getPetById,
	getUsername,
	getAllUsers,
	getGeocodeLocation,
	updatePetData,
	updateUserData,
	deleteUserPet,
	deleteAllUserPets,
	deleteUser,
	createAccount,
	signIn,
	createPetProfile,
	getAll,
};
