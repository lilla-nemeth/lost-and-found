import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import { deleteUserPet, deleteAllUserPets } from '../controllers/petControllers';
import * as updateQueries from '../controllers/updateQueries';
import * as readQueries from '../controllers/readQueries';

const router = Router();

router.get('/', authMw, readQueries.getAllUserPets);
router.delete('/pet/:id', authMw, deleteUserPet);
router.delete('/pet', authMw, deleteAllUserPets);
router.put('/pet/:id', authMw, updateQueries.updatePet);

export default router;
