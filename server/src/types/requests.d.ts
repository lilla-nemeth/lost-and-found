import { Request } from 'express';
import * as petTypes from './petTypes';
import * as userTypes from './userTypes';

type IdParams = string;
type Token = string;

// Request
declare module 'express-serve-static-core' {
	interface Request {
		ReqBody?: RequestPetBody | RequestUserBody;
		file?: File | null | buffer | string;
		P?: RequestPaginationParams | RequestGetPetIdParams | RequestGetSearchParamsQuery;
		userId?: petTypes.UserId;
		isAdmin?: userTypes.IsAdmin;
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
	petstatus: petTypes.PetStatus;
	petlocation: petTypes.PetLocation;
	longitude: petTypes.Longitude;
	latitude: petTypes.Latitude;
	species: petTypes.Species;
	petsize?: petTypes.PetSize;
	breed?: petTypes.Breed;
	sex?: petTypes.Sex;
	color?: petTypes.Color;
	age?: petTypes.Age;
	uniquefeature?: petTypes.UniqueFeature;
	postdescription: petTypes.PostDescription;
	since?: petTypes.Since;
}

interface RequestUserBody {
	username?: userTypes.Username;
	email: userTypes.Email;
	pw: userTypes.Password;
	phone?: userTypes.Phone;
}

export { Request, RequestGetPetIdParams, RequestPaginationParams, RequestGetSearchParamsQuery, RequestPetBody, RequestUserBody };
