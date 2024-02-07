import { Model, Optional } from 'sequelize';

interface UserAttributes {
	id: number;
	username: string;
	email: string;
	pw: string;
	phone: string;
	isAdmin: boolean;
}

interface PetAttributes {
	id: number;
	userId: number;
	img: string;
	petstatus: string;
	longitude: string;
	latitude: string;
	petlocation: string;
	species: string;
	petsize: string;
	breed: string;
	sex: string;
	color: string;
	age: string;
	uniquefeature: string;
	postdescription: string;
	since?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface PetCreationAttributes extends Optional<PetAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
	createdAt?: Date;
	updatedAt?: Date;
}

interface PetInstance extends Model<PetAttributes, PetCreationAttributes>, PetAttributes {
	createdAt?: Date;
	updatedAt?: Date;
}

export { PetInstance, UserInstance };
