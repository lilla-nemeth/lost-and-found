import { Sequelize } from 'sequelize';
import 'dotenv/config';

const dbName = process.env.PG_DATABASE!;
const dbUsername = process.env.PG_USER!;
const dbPassword = process.env.PG_PASSWORD!;
const dbHost = process.env.PG_HOST!;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
	host: dbHost,
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
	.catch((err: any) => {
		console.log('Unable to connect to the database', err);
	});

export default sequelize;
