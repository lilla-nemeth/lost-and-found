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
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
	pw: DataTypes.STRING,
	phone: {
		type: DataTypes.STRING,
		unique: true,
	},
});

export default User;
