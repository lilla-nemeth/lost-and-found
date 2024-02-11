import { Request, Response } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const getAll = async (request: Request, response: Response): Promise<void> => {
	const __filename: string = fileURLToPath(import.meta.url);
	const __dirname: string = dirname(__filename);

	response.sendFile(path.join(__dirname, 'client/build/index.html'));
};

export { getAll };
