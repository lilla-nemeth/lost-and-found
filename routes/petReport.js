import { Router } from 'express';
import { authMw, isFormValid, upload } from '../middlewares.js';
import * as queries from '../queries/queries.js';

const router = Router();

// Posting pet
// Mapbox geocoding search

router.get('/locationsearch/:query', queries.getGeocodeLocation);

export default router;
