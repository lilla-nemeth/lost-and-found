import sequelize from '../config/config.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: DataTypes.STRING,
	email: DataTypes.STRING,
	pw: DataTypes.STRING,
	phone: DataTypes.STRING,
});

export default User;
