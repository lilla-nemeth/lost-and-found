import sequelize from '../config/config.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			len: [2, 29],
		},
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			isEmail: true,
			max: 254,
		},
	},
	pw: {
		type: DataTypes.STRING,
		validate: {
			min: 8,
		},
	},
	phone: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			len: [3, 15],
		},
	},
});

export default User;
