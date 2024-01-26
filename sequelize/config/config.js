import dotenv from 'dotenv';

dotenv.config();

module.exports = {
	development: {
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		dialect: 'postgres',
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: process.env.DATABASE_URL,
		dialect: 'postgres',
	},
};
