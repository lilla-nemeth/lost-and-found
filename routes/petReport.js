import { Router } from 'express';
import { authMw, isFormValid, upload } from '../middlewares.js';
import * as queries from '../queries/queries.js';

const router = Router();

router.post('/', [authMw, upload.single('file')], queries.createPetProfile);

router.get('/:query', queries.getGeocodeLocation);

export default router;
