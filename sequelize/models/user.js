'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const { Attribute, PrimaryKey, AutoIncrement, NotNull } = require('@sequelize/core/decorators-legacy');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		@Attribute(DataTypes.INTEGER)
		@PrimaryKey
		@AutoIncrement
		id;

		@Attribute(DataTypes.STRING)
		username;

		@Attribute(DataTypes.STRING)
		email;

		@Attribute(DataTypes.STRING)
		pw;

		@Attribute(DataTypes.STRING)
		phone;

		static associate(models) {
			this.hasMany(models.Pet, {
				foreignKey: {
					name: 'userId',
					allowNull: false,
				},
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				PrimaryKey: true,
			},
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
