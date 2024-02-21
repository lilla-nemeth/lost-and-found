import { getGeocodeLocation } from '../../controllers/searchControllers';
import { Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../../.env' });

afterEach(() => {
	jest.clearAllMocks();
});

// getGeocodeLocation
describe('get geocode location', () => {
	jest.mock('axios');

	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		return res as Response;
	};

	const mReq: any = {
		params: {
			query: 'search-query',
		},
		url: 'request-url',
	};

	it('should call axios.get with correct URL', async () => {
		const expectedUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${mReq.params.query}.json?access_token=${process.env.API_KEY}`;
		const mRes = mockResponse();
		const axiosGetMock = jest.spyOn(axios, 'get');
		axiosGetMock.mockResolvedValueOnce({ data: { result: 'data' } });

		await getGeocodeLocation(mReq, mRes as Response);

		expect(axios.get).toHaveBeenCalledWith(expectedUrl);
	});

	it('should send response with status 200 and data on successful request', async () => {
		const axiosGetMock = jest.spyOn(axios, 'get');
		const mRes = mockResponse();
		axiosGetMock.mockResolvedValueOnce({ data: { result: 'data' } });

		await getGeocodeLocation(mReq, mRes as Response);

		expect(mRes.status).toHaveBeenCalledWith(200);
		expect(mRes.json).toHaveBeenCalledWith({ result: 'data' });
	});

	it('should send error response with status 500 on failed request', async () => {
		const mRes = mockResponse();
		const errorMessage = 'Internal server error';
		const axiosGetMock = jest.spyOn(axios, 'get');
		axiosGetMock.mockRejectedValueOnce(new Error(errorMessage));

		await getGeocodeLocation(mReq, mRes as Response);

		expect(mRes.status).toHaveBeenCalledWith(500);
		expect(mRes.json).toHaveBeenCalledWith({ error: errorMessage });
	});
});
