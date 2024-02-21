import { Request, Response } from 'express';
import path from 'path';

const getAll = async (request: Request, response: Response): Promise<void> => {
	response.sendFile(path.join(__dirname, '../client/build/index.html'));
};

export { getAll };
