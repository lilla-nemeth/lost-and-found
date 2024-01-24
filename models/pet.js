'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pet extends Model {
		static associate(models) {
			// define association here
		}
	}
	Pet.init(
		{
			id: DataTypes.INTEGER,
			userid: DataTypes.INTEGER,
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
			since: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Pet',
		}
	);
	return Pet;
};
