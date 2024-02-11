import { Router } from 'express';
import { authMw, upload } from '../middlewares/middlewares';
import * as readQueries from '../controllers/readQueries';
import * as createQueries from '../controllers/createQueries';

const router = Router();

router.post('/', [authMw, upload.single('file')], createQueries.createPetProfile);
router.get('/:query', readQueries.getGeocodeLocation);

export default router;
