import { Request } from 'express';

// User types
type Username = string;
type Email = string;
type Password = string;
type Phone = string;
type IsAdmin = boolean;

// Pet types
type Id = string;
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
// 	ReqBody = RequestPetBody | RequestUserBody,
// 	ReqFile = File | null,
// 	ReqQuery = core.Query,
// 	Locals extends Record<string, any> = Record<string, any>
// > extends core.Request<P, ResBody, ReqBody, ReqFile, ReqQuery, Locals> {}

// Requests

declare module 'express-serve-static-core' {
	interface Request {
		ReqBody?: RequestPetBody | RequestUserBody;
		file?: File | null;
		P?: RequestPaginationParams | RequestGetPetIdParams;
	}
}
// Request params
interface RequestPaginationParams {
	skip: string;
	fetch: string;
}

// Request body
interface RequestPetBody {
	petstatus: PetStatus;
	petlocation: PetLocation;
	longitude: Longitude;
	latitude: Latitude;
	species: Species;
	petsize?: Petsize;
	breed?: Breed;
	sex?: Sex;
	color?: Color;
	age?: Age;
	uniquefeature?: UniqueFeature;
	postdescription: PostDescription;
}

interface RequestGetPetIdParams {
	id: Id;
}

// For sign in only email and password are needed - creating new Body interface option?
interface RequestUserBody {
	username?: Username;
	email: Email;
	pw: Password;
	phone?: Phone;
}

interface RequestGetPetUserId extends Request {
	userId: UserId;
}

interface RequestUserPets extends Request {
	userId: UserId;
	isAdmin: IsAdmin;
}

// User requests
// interface RequestCreateUserAccount extends Request {}

// interface RequestSignIn extends Request {
// 	email: Email;
// 	password: Password;
// }

export {
	Request,
	RequestPetBody,
	RequestUserBody,
	RequestGetPetIdParams,
	RequestPaginationParams,
	RequestCreateUserAccount,
	RequestSignIn,
	RequestGetPetUserId,
	RequestUserPets,
};