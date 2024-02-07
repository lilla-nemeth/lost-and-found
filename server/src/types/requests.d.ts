import { Request } from 'express';

type UserId = number;
type PetStatus = string;
type PetLocation = string;

interface RequestCreateUserAccount extends Request {}

interface RequestSignIn extends Request {}

interface RequestCreatePetProfile extends Request {
	userId: UserId;
}

interface RequestCreatePetProfileFile extends Request {
	img: File | null;
}

interface RequestCreatePetProfileBody extends Request {
	petstatus: PetStatus;
	petlocation: PetLocation;
}

interface RequestGetAllUserPets extends Request {
	userId: UserId;
	isAdmin: boolean;
}

export {
	RequestCreatePetProfileBody,
	RequestCreatePetProfileFile,
	RequestCreateUserAccount,
	RequestSignIn,
	RequestCreatePetProfile,
	RequestGetAllUserPets,
};
