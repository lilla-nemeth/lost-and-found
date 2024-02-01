'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
// import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export default (sequelize, DataTypes) => {
	class Pet extends Model {
		id;
		userId;

		img;

		petstatus;

		longitude;

		latitude;

		petlocation;

		species;

		petsize;

		breed;

		sex;

		color;

		age;

		uniquefeature;

		postdescription;

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
