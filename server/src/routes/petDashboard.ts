import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as deleteQueries from '../controllers/deleteQueries';
import * as updateQueries from '../controllers/updateQueries';
import * as readQueries from '../controllers/readQueries';

const router = Router();

router.get('/', authMw, readQueries.getAllUserPets);
router.delete('/pet/:id', authMw, deleteQueries.deleteUserPet);
router.delete('/pet', authMw, deleteQueries.deleteAllUserPets);
router.put('/pet/:id', authMw, updateQueries.updatePet);

export default router;
