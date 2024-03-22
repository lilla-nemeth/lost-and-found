import { Router } from 'express';
import { authMw, upload } from '../middlewares';
import { getGeocodeLocation } from '../controllers/searchControllers';
import { createPetProfile } from '../controllers/petControllers';

const router = Router();

router.post('/', [authMw, upload.single('file')], createPetProfile);
router.get('/:query', getGeocodeLocation);

export default router;
