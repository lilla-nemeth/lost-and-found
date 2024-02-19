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
import * as requestTypes from '../../types/requests';
import models from '../../models/index';
import * as messages from '../../types/messages';
import * as modelTypes from '../../types/models';

const petsMockData = [
	{
		id: 1,
		userId: 3,
		file: Buffer.from('sample-image'),
		petstatus: 'found',
		petlocation: 'Los Angeles',
		latitude: '34.052235',
		longitude: '-118.243683',
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
		userId: 4,
		file: Buffer.from('sample-image'),
		petstatus: 'lost',
		petlocation: 'Paris',
		latitude: '48.856613',
		longitude: '2.352222',
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

const petImage = {
	buffer: petsMockData[0].file,
};

const petBody = {
	petstatus: petsMockData[0].petstatus,
	petlocation: petsMockData[0].petlocation,
	longitude: petsMockData[0].longitude,
	latitude: petsMockData[0].latitude,
	species: petsMockData[0].species,
	petsize: petsMockData[0].petsize,
	breed: petsMockData[0].breed,
	sex: petsMockData[0].sex,
	color: petsMockData[0].color,
	age: petsMockData[0].age,
	uniquefeature: petsMockData[0].uniquefeature,
	postdescription: petsMockData[0].postdescription,
};

// createPetProfile
describe('create pet profile', () => {
	const mReq: requestTypes.Request = {
		userId: petsMockData[0].userId,
		file: petImage,
		body: petBody,
	} as unknown as requestTypes.Request;

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should create a pet profile successfully', async () => {
		const mRes: Response = mockResponse();
		models.Pet.create = jest.fn().mockResolvedValueOnce(petsMockData);

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

// getPetsByPagination
describe('get pets by pagination', () => {
	jest.mock('../../models', () => ({
		Pet: {
			findAndCountAll: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should return pets with pagination', async () => {
		const mRes: Response = mockResponse();

		const petsInstances = petsMockData.map((petsMockData) => {
			const imgBase64 = petsMockData['file'].toString('base64');
			const petsMockDataWithBase64Img = { ...petsMockData, img: imgBase64 };
			return models.Pet.build(petsMockDataWithBase64Img);
		});

		jest.spyOn(models.Pet, 'findAndCountAll').mockResolvedValue({ rows: petsInstances, count: [{ count: petsInstances.length }] });

		const mReq: requestTypes.Request = {
			params: {
				skip: '0',
				fetch: '10',
			},
		} as unknown as requestTypes.Request;

		await getPetsByPagination(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ rows: petsInstances, count: [{ count: petsInstances.length }] });
	});

	it('should return error message if fetching pets fails', async () => {
		const mRes: Response = mockResponse();

		(models.Pet.findAndCountAll as jest.Mock).mockRejectedValue(new Error('Database error'));

		const mReq: requestTypes.Request = {
			params: {
				skip: '0',
				fetch: '10',
			},
		} as unknown as requestTypes.Request;

		await getPetsByPagination(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_PETS });
	});
});

// getPetById

// getAllUserPets
// updatePet
// deleteUserPet
// deleteAllUserPets
