import { Response } from 'express';
import * as types from '../types/requests';
import axios from 'axios';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config({ path: '../../../../.env' });

// search location
const getGeocodeLocation = async (request: types.Request, response: Response): Promise<void> => {
	const query: types.RequestGetSearchParamsQuery['query'] = request.params.query;

	const params: url.URLSearchParams = new URLSearchParams({
		access_token: process.env.API_KEY!,
		...url.parse(request.url, true).query,
	});
	const result = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`;

	await axios
		.get(result)
		.then((res: any) => {
			response.status(200).json(res.data);
		})
		.catch((err: any) => {
			response.status(500).json({ error: err.message });
		});
};

export { getGeocodeLocation };
