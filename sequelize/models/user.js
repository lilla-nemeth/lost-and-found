import sequelize from '../config/config.js';
import { DataTypes } from 'sequelize';
import Pet from './pet.js';

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

User.hasMany(Pet, {
	foreignKey: {
		name: 'userId',
		allowNull: false,
	},
});

export default User;
