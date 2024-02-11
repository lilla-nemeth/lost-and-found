import { Router } from 'express';
import { authMw, isFormValid } from '../middlewares/middlewares';
import * as updateQueries from '../controllers/updateQueries';
import { deleteUser } from '../controllers/userControllers';

const router = Router();

router.put('/user', [authMw, isFormValid], updateQueries.updateUser);
router.delete('/user', authMw, deleteUser);

export default router;
