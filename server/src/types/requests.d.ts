import { Request } from 'express';

type UserId = number;

interface RequestCreateUserAccount extends Request {}

interface RequestSignIn extends Request {}

interface RequestCreatePetProfile extends Request {
	userId: UserId;
}

interface RequestGetAllUserPets extends Request {
	userId: UserId;
	isAdmin: boolean;
}

export { RequestCreateUserAccount, RequestSignIn, RequestCreatePetProfile, RequestGetAllUserPets };
