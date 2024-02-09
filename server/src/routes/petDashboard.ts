import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as deleteQueries from '../sequelize/queries/delete/deleteQueries';
import * as updateQueries from '../sequelize/queries/update/updateQueries';
import * as readQueries from '../sequelize/queries/read/readQueries';

const router = Router();

router.get('/', authMw, readQueries.getAllUserPets);
router.delete('/pet/:id', authMw, deleteQueries.deleteUserPet);
router.delete('/pet', authMw, deleteQueries.deleteAllUserPets);
router.put('/pet/:id', authMw, updateQueries.updatePet);

export default router;
