import { Response } from 'express';
import * as types from '../types/requests';
import models from '../models';
import * as messages from '../types/messages';
import { PetInstance } from '../types/models';

// CREATE
const createPet = async (request: types.Request, response: Response): Promise<void> => {
	try {
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
		const pet: PetInstance = await models.Pet.create({
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

		response.status(200).json(pet);
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_CREATE_PET });
	}
};

// READ
// get/fetch pets by pagination, data has data.rows (pet objects) and data.count (total)
const getPetsByPagination = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const skip: types.RequestPaginationParams['skip'] = request.params.skip;
		const fetch: types.RequestPaginationParams['fetch'] = request.params.fetch;

		const offset = Number(skip);
		const limit = Number(fetch);

		const { rows: pets, count } = await models.Pet.findAndCountAll({
			order: [['since', 'DESC']],
			offset,
			limit,
		});

		response.status(200).json({ rows: pets, count });
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_FETCH_PETS });
	}
};

const getPetById = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const id: types.RequestGetPetIdParams['id'] = request.params.id;

		const pet: PetInstance | null = await models.Pet.findByPk(id);

		response.status(200).json(pet);
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
	}
};

const getAllUserPets = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const userId: types.Request['userId'] = request.userId;
		const isAdmin: types.Request['isAdmin'] = request.isAdmin;

		let petList: PetInstance[];

		if (isAdmin) {
			petList = await models.Pet.findAll({
				order: [['since', 'DESC']],
			});
		} else {
			petList = await models.Pet.findAll({
				order: [['since', 'DESC']],
				where: {
					userId,
				},
			});
		}

		response.status(200).json(petList);
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
	}
};

// UPDATE
const updatePet = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const id: types.RequestGetPetIdParams['id'] = request.params.id;
		const {
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
		}: types.RequestPetBody = request.body;

		await models.Pet.update(
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

		response.status(200).json({ msg: messages.SUCCESS_MSG_UPDATED_PET });
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_UPDATE_PET });
	}
};

// DELETE
const deletePet = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const paramsId: types.RequestGetPetIdParams['id'] = request.params.id;
		const id = Number(paramsId);

		await models.Pet.destroy({
			where: {
				id: id,
			},
		});

		response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PET });
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PET });
	}
};

const deleteAllPets = async (request: types.Request, response: Response): Promise<void> => {
	try {
		const userId: types.Request['userId'] = request.userId;
		const isAdmin: types.Request['isAdmin'] = request.isAdmin;

		let options: any = { truncate: true };

		if (!isAdmin) {
			options.where = { userId };
		}

		await models.Pet.destroy(options);

		response.status(200).json({ msg: messages.SUCCESS_MSG_DELETED_PETS });
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: messages.ERROR_MSG_DELETE_PETS });
	}
};

export { createPet, getPetsByPagination, getPetById, getAllUserPets, updatePet, deletePet, deleteAllPets };
