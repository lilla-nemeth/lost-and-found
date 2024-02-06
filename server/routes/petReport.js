import { Router } from 'express';
import { authMw, upload } from '../middlewares/middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.post('/', [authMw, upload.single('file')], queries.createPetProfile);
router.get('/:query', queries.getGeocodeLocation);

export default router;
