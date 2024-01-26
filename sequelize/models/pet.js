'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

module.exports = (sequelize, DataTypes) => {
	class Pet extends Model {
		@Attribute(DataTypes.INTEGER)
		@PrimaryKey
		@AutoIncrement
		id;

		@Attribute(DataTypes.INTEGER)
		@NotNull
		userId;

		@Attribute(DataTypes.STRING)
		img;

		@Attribute(DataTypes.STRING)
		petstatus;

		@Attribute(DataTypes.STRING)
		longitude;

		@Attribute(DataTypes.STRING)
		latitude;

		@Attribute(DataTypes.STRING)
		petlocation;

		@Attribute(DataTypes.STRING)
		species;

		@Attribute(DataTypes.STRING)
		petsize;

		@Attribute(DataTypes.STRING)
		breed;

		@Attribute(DataTypes.STRING)
		sex;

		@Attribute(DataTypes.STRING)
		color;

		@Attribute(DataTypes.STRING)
		age;

		@Attribute(DataTypes.STRING)
		uniquefeature;

		@Attribute(DataTypes.STRING)
		postdescription;

		@Attribute(DataTypes.DATE)
		@NotNull
		since;

		static associate(models) {
			this.belongsTo(models.User);
		}
	}
	Pet.init(
		{
			id: {
				type: DataTypes.INTEGER,
				PrimaryKey: true,
				AutoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			img: DataTypes.STRING,
			petstatus: DataTypes.STRING,
			longitude: DataTypes.STRING,
			latitude: DataTypes.STRING,
			petlocation: DataTypes.STRING,
			species: DataTypes.STRING,
			petsize: DataTypes.STRING,
			breed: DataTypes.STRING,
			sex: DataTypes.STRING,
			color: DataTypes.STRING,
			age: DataTypes.STRING,
			uniquefeature: DataTypes.STRING,
			postdescription: DataTypes.STRING,
			since: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Pet',
		}
	);
	return Pet;
};
