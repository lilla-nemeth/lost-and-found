import { Router } from 'express';
import { authMw, isFormValid } from '../middlewares/middlewares';
import * as updateQueries from '../sequelize/queries/update/updateQueries';
import * as deleteQueries from '../sequelize/queries/delete/deleteQueries';

const router = Router();

router.put('/user', [authMw, isFormValid], updateQueries.updateUser);
router.delete('/user', authMw, deleteQueries.deleteUser);

export default router;
