import sequelize from '../config/sequelize.config';
import { DataTypes } from 'sequelize';

import { PetInstance } from '../types/models';

const Pet = sequelize.define<PetInstance>('pet', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
	},
	img: DataTypes.TEXT,
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
		defaultValue: DataTypes.NOW,
	},
});

export default Pet;
