'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			id: DataTypes.INTEGER,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			pw: DataTypes.STRING,
			phone: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
