import { Request } from 'express';

// User Types
type IdParams = string;
type Username = string;
type Email = string;
type Password = string;
type Phone = string;
type IsAdmin = boolean;
type Token = string;

// Pet Types
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

// Request
declare module 'express-serve-static-core' {
	interface Request {
		ReqBody?: RequestPetBody | RequestUserBody;
		file?: File | null | buffer | string;
		P?: RequestPaginationParams | RequestGetPetIdParams | RequestGetSearchParamsQuery;
		userId?: UserId;
		isAdmin?: IsAdmin;
		headers: any;
	}
}

type buffer = any;

// Request Params
interface RequestPaginationParams {
	skip: string;
	fetch: string;
}

interface RequestGetPetIdParams {
	id: IdParams;
}

interface RequestGetSearchParamsQuery {
	query: string;
}

// Request Body
interface RequestPetBody {
	userId: UserId;
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

interface RequestUserBody {
	username?: Username;
	email: Email;
	pw: Password;
	phone?: Phone;
}

// For testing
interface CustomRequest extends Request {
	body: RequestUserBody;
}

export {
	Request,
	RequestGetPetIdParams,
	RequestPaginationParams,
	RequestGetSearchParamsQuery,
	RequestPetBody,
	RequestUserBody,
	CustomRequest,
};
