import { Router } from 'express';
import { authMw, upload } from '../middlewares/middlewares';
import * as queries from '../sequelize/queries/queries';

const router = Router();

router.post('/', [authMw, upload.single('file')], queries.createPetProfile);
router.get('/:query', queries.getGeocodeLocation);

export default router;
