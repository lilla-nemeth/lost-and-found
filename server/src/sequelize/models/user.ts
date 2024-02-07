import sequelize from '../config/config';
import { DataTypes } from 'sequelize';
import { UserInstance } from '../../types/models';

const User = sequelize.define<UserInstance>('user', {
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
	isAdmin: {
		type: DataTypes.BOOLEAN,
	},
});

export default User;
