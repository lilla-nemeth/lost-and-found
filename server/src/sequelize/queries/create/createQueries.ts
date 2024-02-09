import { Request, Response } from 'express';
import * as types from '../../../types/requests';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { isFormValid } from '../../../middlewares/middlewares';
import models from '../../models/index';
import * as messages from '../../../types/messages';

dotenv.config({ path: '../../../../.env' });

const createUserAccount = (request: Request, response: Response) => {
	const username: types.RequestUserBody['username'] = request.body.username as string;
	const email: types.RequestUserBody['email'] = request.body.email;
	const pw: types.RequestUserBody['pw'] = request.body.pw;
	const phone: types.RequestUserBody['phone'] = request.body.phone as string;
	const encryptedPw: types.RequestUserBody['pw'] = bcrypt.hashSync(pw, 10);

	const user = models.User.create({
		username,
		email,
		pw: encryptedPw,
		phone,
		isAdmin: false,
	});

	user
		.then((data) => {
			response.status(200).json(data.save());
		})
		.catch((err) => {
			if (err.code === '23505' && err.constraint === 'users_email_key') {
				response.status(400).json({ msg: messages.ERROR_MSG_USED_EMAIL });
			} else if (err.code === '23505' && err.constraint === 'users_phone_key') {
				response.status(400).json({ msg: messages.ERROR_MSG_USED_PHONE });
			} else if (err.code != '23505' && isFormValid) {
				isFormValid;
			}
		});
};

// report pet by user
const createPetProfile = (request: Request | any, response: Response) => {
	const userId: Request['userId'] = request.userId as number;
	const img: Request['file'] = request.file.buffer.toString('base64') as string;
	const petstatus: types.RequestPetBody['petstatus'] = request.body.petstatus;
	const petlocation: types.RequestPetBody['petlocation'] = request.body.petlocation;
	const longitude: types.RequestPetBody['longitude'] = request.body.longitude;
	const latitude: types.RequestPetBody['latitude'] = request.body.latitude;
	const species: types.RequestPetBody['species'] = request.body.species;
	const petsize: types.RequestPetBody['petsize'] = request.body.petsize as string;
	const breed: types.RequestPetBody['breed'] = request.body.breed as string;
	const sex: types.RequestPetBody['sex'] = request.body.sex as string;
	const color: types.RequestPetBody['color'] = request.body.color as string;
	const age: types.RequestPetBody['age'] = request.body.age as string;
	const uniquefeature: types.RequestPetBody['uniquefeature'] = request.body.uniquefeature as string;
	const postdescription: types.RequestPetBody['postdescription'] = request.body.postdescription;

	const pet = models.Pet.create({
		userId,
		img,
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
	});

	pet
		.then((data) => {
			response.status(200).json(data.save());
		})
		.catch((err) => {
			response.status(400).json({ msg: messages.ERROR_MSG_CREATE_PET });
		});
};

export { createUserAccount, createPetProfile };
