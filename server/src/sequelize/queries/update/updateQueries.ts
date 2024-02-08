import { Request, Response } from 'express';
import * as types from '../../../types/requests';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../../models/index';
import * as messages from '../../../types/messages';

dotenv.config({ path: '../../../../.env' });

// edit pet by user (user dashboard)
const updatePet = (request: Request, response: Response) => {
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

	const pet = models.Pet.update(
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
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_PET }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_PET }));
};

// edit user data (Dashboard)
const updateUser = (request: Request, response: Response) => {
	// TODO: fix this:
	const id: types.RequestGetPetUserId['userId'] = request.userId;
	const username: types.RequestUserBody['username'] = request.body.username;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user = models.User.update(
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
		.then((res) => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_USER }))
		.catch((err) => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_USER }));
};

export { updatePet, updateUser };
