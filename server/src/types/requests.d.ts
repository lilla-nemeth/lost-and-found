import { Request } from 'express';
import { File } from 'multer';

// User types
type Username = string;
type Email = string;
type Password = string;
type Phone = string;

// Pet types
type UserId = number;
type PetStatus = string;
type PetLocation = string;
type Longitude = string;
type Latitude = string;
type Species = string;
type Petsize = string;
type Breed = string;
type Sex = string;
type Color = string;
type Age = string;
type UniqueFeature = string;
type PostDescription = string;

// interface Request<
// 	P = core.ParamsDictionary,
// 	ResBody = any,
// 	ReqBody = any,
// 	ReqQuery = core.Query,
// 	Locals extends Record<string, any> = Record<string, any>
// > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

declare module 'express-serve-static-core' {
	interface Request {
		body?: RequestPetBody | RequestUserBody;
		file?: File | null;
	}
}
// Requests - body
interface RequestPetBody {
	petstatus: PetStatus;
	petlocation: PetLocation;
	longitude: Longitude;
	latitude: Latitude;
	species: Species;
	petsize: Petsize;
	breed: Breed;
	sex: Sex;
	color: Color;
	age: Age;
	uniquefeature: UniqueFeature;
	postdescription: PostDescription;
}

interface RequestUserBody {
	username: Username;
	email: Email;
	pw: Password;
	phone: Phone;
}

// Requests
interface RequestCreatePetProfile extends Request {
	userId: UserId;
}

// interface RequestGetAllUserPets extends Request {
// 	userId: UserId;
// 	isAdmin: boolean;
// }

// // User requests
// interface RequestCreateUserAccount extends Request {}

// interface RequestSignIn extends Request {
// 	email: Email;
// 	password: Password;
// }

export { Request, RequestPetBody, RequestCreateUserAccount, RequestSignIn, RequestCreatePetProfile, RequestGetAllUserPets };
