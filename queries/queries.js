import pg from 'pg';
import * as messages from '../types/messageTypes.js';
import * as queries from '../types/queryTypes.js';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

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

// get all pets by userId
const getAllUserPets = (request, response) => {
	let userId = request.userId;
	let isadmin = request.isadmin;

	let adminQuery = queries.SELECT_PETS_BY_DESC_DATE;
	let userQuery = queries.SELECT_PETS_BY_USER;

	pool
		.query(isadmin ? adminQuery : userQuery, [userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS }));
};

// get all pets
const getAllPets = (request, response) => {
	pool
		.query(queries.SELECT_PETS_BY_DESC_DATE)
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_ALL_PETS }));
};

// get/fetch limited amount of pets to pagination
const getPetsByPagination = (request, response) => {
	let limit = request.params.fetch;
	let offset = request.params.skip;

	pool
		.query(queries.SELECT_PETS_BY_PAGINATION, [limit, offset])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_FETCH_PETS }));
};

export { getAllUserPets, getAllPets, getPetsByPagination };
