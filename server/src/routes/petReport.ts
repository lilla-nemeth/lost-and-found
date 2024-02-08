import { Router } from 'express';
import { authMw, upload } from '../middlewares/middlewares';
import * as readQueries from '../sequelize/queries/read/readQueries';
import * as createQueries from '../sequelize/queries/create/createQueries';

const router = Router();

router.post('/', [authMw, upload.single('file')], createQueries.createPetProfile);
router.get('/:query', readQueries.getGeocodeLocation);

export default router;
