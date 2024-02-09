import { Response } from 'express';
import * as types from '../../../types/requests';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../../models/index';
import * as messages from '../../../types/messages';

dotenv.config({ path: '../../../../.env' });

// edit pet by user (Dashboard)
const updatePet = async (request: types.Request, response: Response): Promise<void> => {
	const id: types.RequestGetPetIdParams['id'] = request.params.id;
	const petstatus: types.RequestPetBody['petstatus'] = request.body.petstatus;
	const petlocation: types.RequestPetBody['petlocation'] = request.body.petlocation;
	const longitude: types.RequestPetBody['longitude'] = request.body.longitude;
	const latitude: types.RequestPetBody['latitude'] = request.body.latitude;
	const species: types.RequestPetBody['species'] = request.body.species;
	const petsize: types.RequestPetBody['petsize'] = request.body.petsize;
	const breed: types.RequestPetBody['breed'] = request.body.breed;
	const sex: types.RequestPetBody['sex'] = request.body.sex;
	const color: types.RequestPetBody['color'] = request.body.color;
	const age: types.RequestPetBody['age'] = request.body.age;
	const uniquefeature: types.RequestPetBody['uniquefeature'] = request.body.uniquefeature;
	const postdescription: types.RequestPetBody['postdescription'] = request.body.postdescription;

	const pet: Promise<[affectedCount: number]> = models.Pet.update(
		{
			petstatus,
			petlocation,
			longitude,
			latitude,
			species,
			petsize,
			breed,
			sex,
			color,
			age,
			uniquefeature,
			postdescription,
		},
		{
			where: {
				id,
			},
		}
	);

	pet
		.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_PET }))
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_PET }));
};

// edit user data (Dashboard)
const updateUser = async (request: types.Request, response: Response): Promise<void> => {
	const id: types.Request['userId'] = request.userId;
	const username: types.RequestUserBody['username'] = request.body.username;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user: Promise<[affectedCount: number]> = models.User.update(
		{
			username,
			email,
			pw: encryptedPw,
			phone,
		},
		{
			where: {
				id,
			},
		}
	);
	user
		.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_USER }))
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_USER }));
};

export { updatePet, updateUser };
