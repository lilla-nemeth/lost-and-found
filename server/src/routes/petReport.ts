import { Router } from 'express';
import { authMw, upload } from '../middlewares';
import { getGeocodeLocation } from '../controllers/searchControllers';
import { createPet } from '../controllers/petControllers';

const router = Router();

router.post('/', [authMw, upload.single('file')], createPet);
router.get('/:query', getGeocodeLocation);

export default router;
