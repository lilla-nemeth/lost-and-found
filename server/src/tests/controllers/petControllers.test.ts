import {
	createPetProfile,
	getPetsByPagination,
	getPetById,
	getAllUserPets,
	updatePet,
	deleteUserPet,
	deleteAllUserPets,
} from '../../controllers/petControllers';
import { Response } from 'express';
import * as types from '../../types/requests';
import models from '../../models/index';
import * as messages from '../../types/messages';

const petMockData = [
	{
		id: 1,
		img: Buffer.from('sample-image'),
		petstatus: 'found',
		petlocation: 'Los Angeles',
		latitude: 34.052235,
		longitude: -118.243683,
		species: 'dog',
		petsize: 'medium',
		breed: 'Labrador Retriever',
		sex: 'male',
		color: 'black',
		age: '2 years',
		uniquefeature: 'none',
		postdescription: 'A friendly dog looking for a new home.',
	},
	{
		id: 2,
		img: Buffer.from('sample-image'),
		petstatus: 'lost',
		petlocation: 'Paris',
		latitude: 48.856613,
		longitude: 2.352222,
		species: 'dog',
		petsize: 'medium',
		breed: 'German Shepherd',
		sex: 'male',
		color: 'black, brown',
		age: '5 years',
		uniquefeature: 'blue collar',
		postdescription: 'My dog has disappeared in Paris.',
	},
];

describe('createPetProfile function', () => {
	const petId = petMockData[0].id;

	const petImage = {
		buffer: petMockData[0].img,
	};

	const petBody = {
		petstatus: petMockData[0].petstatus,
		petlocation: petMockData[0].petlocation,
		longitude: petMockData[0].longitude,
		latitude: petMockData[0].latitude,
		species: petMockData[0].species,
		petsize: petMockData[0].petsize,
		breed: petMockData[0].breed,
		sex: petMockData[0].sex,
		color: petMockData[0].color,
		age: petMockData[0].age,
		uniquefeature: petMockData[0].uniquefeature,
		postdescription: petMockData[0].postdescription,
	};

	const petData = {
		id: petMockData[0].id,
		img: petMockData[0].img,
		petstatus: petMockData[0].petstatus,
		petlocation: petMockData[0].petlocation,
		longitude: petMockData[0].longitude,
		latitude: petMockData[0].latitude,
		species: petMockData[0].species,
		petsize: petMockData[0].petsize,
		breed: petMockData[0].breed,
		sex: petMockData[0].sex,
		color: petMockData[0].color,
		age: petMockData[0].age,
		uniquefeature: petMockData[0].uniquefeature,
		postdescription: petMockData[0].postdescription,
	};

	const mReq: types.CustomRequest = {
		userId: petId,
		file: petImage,
		body: petBody,
	} as unknown as types.CustomRequest;

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should create a pet profile successfully', async () => {
		const mRes: Response = mockResponse();
		models.Pet.create = jest.fn().mockResolvedValueOnce(petData);

		await createPetProfile(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalled();
		expect(models.Pet.create).toHaveBeenCalled();
	});

	it('should handle error if pet profile creation fails', async () => {
		const mRes: Response = mockResponse();
		models.Pet.create = jest.fn().mockRejectedValueOnce(new Error(messages.ERROR_MSG_CREATE_PET));

		await createPetProfile(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_CREATE_PET });
	});
});

// createPetProfile
// getPetsByPagination
// getPetById
// getAllUserPets
// updatePet
// deleteUserPet
// deleteAllUserPets
