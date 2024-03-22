import { Model, Optional } from 'sequelize';
import * as userTypes from './userTypes';
import * as petTypes from './petTypes';

interface UserAttributes {
	id: userTypes.Id;
	username: userTypes.Username;
	email: userTypes.Email;
	pw: userTypes.Password;
	phone: userTypes.Phone;
	isAdmin: userTypes.IsAdmin;
}

interface PetAttributes {
	id: petTypes.Id;
	userId: petTypes.UserId;
	img: petTypes.Img;
	petstatus: petTypes.PetStatus;
	longitude: petTypes.Longitude;
	latitude: petTypes.Latitude;
	petlocation: petTypes.PetLocation;
	species: petTypes.Species;
	petsize: petTypes.PetSize;
	breed: petTypes.Breed;
	sex: petTypes.Sex;
	color: petTypes.Color;
	age: petTypes.Age;
	uniquefeature: petTypes.UniqueFeature;
	postdescription: petTypes.PostDescription;
	since?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface PetCreationAttributes extends Optional<PetAttributes, 'id' | 'petsize' | 'breed' | 'sex' | 'color' | 'age' | 'uniquefeature'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
	createdAt?: Date;
	updatedAt?: Date;
}

interface PetInstance extends Model<PetAttributes, PetCreationAttributes>, PetAttributes {
	createdAt?: Date;
	updatedAt?: Date;
}

export { PetInstance, UserInstance };
