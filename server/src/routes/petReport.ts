import { Router } from 'express';
import { authMw, upload } from '../middlewares/middlewares';
import * as readQueries from '../controllers/readQueries';
import { createPetProfile } from '../controllers/petControllers';

const router = Router();

router.post('/', [authMw, upload.single('file')], createPetProfile);
router.get('/:query', readQueries.getGeocodeLocation);

export default router;
