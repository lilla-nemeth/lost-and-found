import { Response } from 'express';
import * as types from '../types/requests';
import models from '../models/index';
import * as messages from '../types/messages';
import { PetInstance, GetPets } from '../types/models';

// CREATE
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

	await pet.then((data) => response.status(200).json(data)).catch(() => response.status(400).json({ msg: messages.ERROR_MSG_CREATE_PET }));
};

// READ
// get/fetch pets by pagination, data has data.rows (pet objects) and data.count (total)
const getPetsByPagination = async (request: types.Request, response: Response): Promise<void> => {
	const skip: types.RequestPaginationParams['skip'] = request.params.skip;
	const fetch: types.RequestPaginationParams['fetch'] = request.params.fetch;

	const offset = Number(skip);
	const limit = Number(fetch);

	const pets: GetPets = models.Pet.findAndCountAll({
		order: [['since', 'DESC']],
		offset,
		limit,
	});
	await pets
		.then((data) => {
			response.status(200).json(data);
		})
		.catch(() => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_PETS });
		});
};

// from pets table get one pet by id
const getPetById = async (request: types.Request, response: Response): Promise<void> => {
	const id: types.RequestGetPetIdParams['id'] = request.params.id;

	const pet: Promise<PetInstance | null> = models.Pet.findByPk(id);

	await pet
		.then((data) => {
			response.status(200).json(data);
		})
		.catch(() => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
		});
};

// get all pets by userId
const getAllUserPets = async (request: types.Request, response: Response): Promise<void> => {
	const userId: types.Request['userId'] = request.userId;
	const isAdmin: types.Request['isAdmin'] = request.isAdmin;

	let petListPromise: Promise<PetInstance[]>;

	if (isAdmin) {
		petListPromise = models.Pet.findAll({
			order: [['since', 'DESC']],
		});
	} else {
		petListPromise = models.Pet.findAll({
			order: [['since', 'DESC']],
			where: {
				userId,
			},
		});
	}

	await petListPromise
		.then((data: PetInstance[]) => {
			response.status(200).json(data);
		})
		.catch(() => {
			response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
		});
};

// UPDATE
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

	await pet
		.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_PET }))
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_PET }));
};

// DELETE
// delete 1 pet by user (user dashboard)
const deleteUserPet = async (request: types.Request, response: Response): Promise<void> => {
	const paramsId: types.RequestGetPetIdParams['id'] = request.params.id;

	const id = Number(paramsId);

	const pet: Promise<number> = models.Pet.destroy({
		where: {
			id: id,
		},
	});

	await pet
		.then(() => {
			response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PET });
		})
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PET }));
};

// delete all pets by user (user dashboard)
const deleteAllUserPets = async (request: types.Request, response: Response): Promise<void> => {
	const userId: types.Request['userId'] = request.userId;
	const isAdmin: types.Request['isAdmin'] = request.isAdmin;

	let petListPromise: Promise<PetInstance['id']>;

	if (isAdmin) {
		petListPromise = models.Pet.destroy({ truncate: true });
	} else {
		petListPromise = models.Pet.destroy({
			truncate: true,
			where: {
				userId,
			},
		});
	}

	await petListPromise
		.then(() => response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS }))
		.catch(() => response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS }));
};

export { createPetProfile, getPetsByPagination, getPetById, getAllUserPets, updatePet, deleteUserPet, deleteAllUserPets };
