import {
	createPetProfile,
	getPetsByPagination,
	getPetById,
	getAllUserPets,
	updatePet,
	deleteUserPet,
	deleteAllPets,
} from '../../controllers/petControllers';
import { Response } from 'express';
import * as requestTypes from '../../types/requests';
import models from '../../models/index';
import * as messages from '../../types/messages';
import * as modelTypes from '../../types/models';

const petFile = {
	file: Buffer.from('sample-image'),
};

const petImage = {
	buffer: Buffer.from('sample-image'),
};

const petsMockData = [
	{
		id: 1,
		userId: 1,
		img: 'testimage',
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
		userId: 1,
		img: 'testimage',
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

		const petsInstances = petsMockData.map((petData) => {
			const imgBase64 = petFile['file'].toString('base64') as string;
			const petsMockDataWithBase64Img = { ...petData, img: imgBase64 };
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
describe('get pet by id', () => {
	jest.mock('../../models', () => ({
		Pet: {
			findByPk: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should return a pet when found', async () => {
		const mRes: Response = mockResponse();
		const petId = '1';

		jest.spyOn(models.Pet, 'findByPk').mockResolvedValueOnce(Promise.resolve(petsMockData[0] as any));

		const mReq: requestTypes.Request = {
			params: {
				id: petId,
			},
		} as unknown as requestTypes.Request;

		await getPetById(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith(petsMockData[0]);
	});

	it('should return error message if pet is not found', async () => {
		const mRes: Response = mockResponse();

		jest.spyOn(models.Pet, 'findByPk').mockRejectedValue(null);

		const mReq: requestTypes.Request = {
			params: {
				id: '1',
			},
		} as unknown as requestTypes.Request;

		await getPetById(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
	});

	it('should return error message if an error occurs during retrieval', async () => {
		const mRes: Response = mockResponse();

		jest.spyOn(models.Pet, 'findByPk').mockRejectedValue(new Error('Database error'));

		const mReq: requestTypes.Request = {
			params: {
				id: '1',
			},
		} as unknown as requestTypes.Request;

		await getPetById(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
	});
});

// getAllUserPets
describe('get all user or admin pets', () => {
	jest.mock('../../models', () => ({
		Pet: {
			findAll: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should return user pets when user is not an admin', async () => {
		const mRes: Response = mockResponse();
		const userId = 1;
		const isAdmin = false;
		const userPetList: modelTypes.PetInstance[] = petsMockData.map((petData) => models.Pet.build(petData));

		jest.spyOn(models.Pet, 'findAll').mockResolvedValue(userPetList);

		const mReq: requestTypes.Request = {
			userId,
			isAdmin,
		} as requestTypes.Request;

		await getAllUserPets(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith(userPetList);
	});

	it('should return all pets when user is an admin', async () => {
		const mRes: Response = mockResponse();
		const isAdmin = true;
		const adminPetList: modelTypes.PetInstance[] = petsMockData.map((petData) => models.Pet.build(petData));

		jest.spyOn(models.Pet, 'findAll').mockResolvedValueOnce(adminPetList);

		const mReq: requestTypes.Request = {
			isAdmin,
		} as requestTypes.Request;

		await getAllUserPets(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith(adminPetList);
	});

	it('should handle errors when fetching pets fails', async () => {
		const isAdmin = false;

		jest.spyOn(models.Pet, 'findAll').mockRejectedValue(new Error('Database error'));

		const mReq: requestTypes.Request = {
			isAdmin,
		} as requestTypes.Request;

		const mRes: Response = mockResponse();

		await getAllUserPets(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_FETCH_USER_PETS });
	});
});

// updatePet
describe('update pet', () => {
	jest.mock('../../models', () => ({
		Pet: {
			update: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should update pet successfully', async () => {
		const mReq: requestTypes.Request = {
			params: { id: 1 },
			body: petBody,
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'update').mockResolvedValue([1]);

		await updatePet(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.SUCCESS_MSG_UPDATED_PET });
	});

	it('should handle error while updating pet', async () => {
		const mReq: requestTypes.Request = {
			params: { id: 1 },
			body: petBody,
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'update').mockRejectedValue(new Error('Database error'));

		await updatePet(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_UPDATE_PET });
	});
});

// deleteUserPet
describe('delete user pet', () => {
	jest.mock('../../models', () => ({
		Pet: {
			destroy: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should delete pet successfully', async () => {
		const mReq: requestTypes.Request = {
			params: { id: 1 },
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'destroy').mockResolvedValue(1);

		await deleteUserPet(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.SUCCESS_MSG_DELETED_PET });
	});

	it('should handle error while deleting pet', async () => {
		const mReq: requestTypes.Request = {
			params: { id: 1 },
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'destroy').mockRejectedValue(new Error('Database error'));

		await deleteUserPet(mReq, mRes);

		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_DELETE_PET });
	});
});

// deleteAllPets
describe('deleteAllPets function', () => {
	jest.mock('../../models', () => ({
		Pet: {
			destroy: jest.fn(),
		},
	}));

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	it('should delete all user pets successfully as admin', async () => {
		const mReq: requestTypes.Request = {
			userId: 2,
			isAdmin: true,
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'destroy').mockResolvedValue(Promise.resolve(0));

		await deleteAllPets(mReq, mRes);

		expect(models.Pet.destroy).toHaveBeenCalledWith({ truncate: true });
		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.SUCCESS_MSG_DELETED_PETS });
	});

	it('should delete user pets successfully as user', async () => {
		const mReq: requestTypes.Request = {
			userId: 5,
			isAdmin: false,
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'destroy').mockResolvedValueOnce(Promise.resolve(5));

		await deleteAllPets(mReq, mRes);

		expect(models.Pet.destroy).toHaveBeenCalledWith({
			truncate: true,
			where: { userId: mReq.userId },
		});
		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.SUCCESS_MSG_DELETED_PETS });
	});

	it('should handle error while deleting admin pets', async () => {
		const mReq: requestTypes.Request = {
			userId: 5,
			isAdmin: true,
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'destroy').mockRejectedValue(new Error('Database error'));

		await deleteAllPets(mReq, mRes);

		expect(models.Pet.destroy).toHaveBeenCalledWith({
			truncate: true,
		});
		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_DELETE_PETS });
	});

	it('should handle error while deleting user pets', async () => {
		const mReq: requestTypes.Request = {
			userId: 5,
			isAdmin: false,
		} as unknown as requestTypes.Request;

		const mRes = mockResponse();

		jest.spyOn(models.Pet, 'destroy').mockRejectedValue(new Error('Database error'));

		await deleteAllPets(mReq, mRes);

		expect(models.Pet.destroy).toHaveBeenCalledWith({
			truncate: true,
			where: { userId: mReq.userId },
		});
		expect(mRes.status).toHaveBeenCalledWith(400);
		expect(mRes.json).toHaveBeenCalledWith({ msg: messages.ERROR_MSG_DELETE_PETS });
	});
});
