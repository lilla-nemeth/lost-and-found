import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
	host: process.env.PG_HOST,
	dialect: 'postgres',
	define: {
		timestamps: false,
	},
	pool: {
		max: 9,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully');
	})
	.catch((err) => {
		console.log('Unable to connect to the database', err);
	});

export default sequelize;
