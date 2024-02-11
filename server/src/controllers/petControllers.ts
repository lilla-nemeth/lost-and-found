import { Response } from 'express';
import * as types from '../types/requests';
import models from '../models/index';
import * as messages from '../types/messages';
import { PetInstance } from '../types/models';

// report pet by user
const createPetProfile = async (request: types.Request, response: Response): Promise<void> => {
	const userId: types.Request['userId'] = request.userId as number;
	const img: types.Request['file'] = request.file.buffer.toString('base64') as string;
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

	const pet: Promise<PetInstance> = models.Pet.create({
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

	pet.then((data) => response.status(200).json(data.save())).catch(() => response.status(400).json({ msg: messages.ERROR_MSG_CREATE_PET }));
};

// delete 1 pet by user (user dashboard)
const deleteUserPet = async (request: types.Request, response: Response): Promise<void> => {
	const paramsId: types.RequestGetPetIdParams['id'] = request.params.id;

	const id = Number(paramsId);

	const pet: Promise<number> = models.Pet.destroy({
		where: {
			id: id,
		},
	});

	pet
		.then(() => {
			response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PET });
		})
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PET }));
};

// delete all pets by user (user dashboard)
const deleteAllUserPets = async (request: types.Request, response: Response): Promise<void> => {
	const userId: types.Request['userId'] = request.userId;
	const isAdmin: types.Request['isAdmin'] = request.isAdmin;

	const userPetList = models.Pet.destroy({
		truncate: true,
		where: {
			userId,
		},
	});

	const adminPetList = models.Pet.destroy({ truncate: true });

	if (isAdmin) {
		adminPetList
			.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS }))
			.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
	} else {
		userPetList
			.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS }))
			.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
	}
};

export { createPetProfile, deleteUserPet, deleteAllUserPets };
