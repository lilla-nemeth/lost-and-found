import { getAll } from '../../controllers/clientControllers';
import { Request, Response } from 'express';
import path from 'path';

afterEach(() => {
	jest.clearAllMocks();
});

// getAll
describe('getAll', () => {
	it('should send the HTML file', async () => {
		const mReq = {} as Request;
		const mRes = {
			sendFile: jest.fn(),
		} as unknown as Response;

		await getAll(mReq, mRes);

		const expectedFilePath = path.join(__dirname, '../../client/build/index.html');

		expect(mRes.sendFile).toHaveBeenCalledWith(expectedFilePath);
	});
});
