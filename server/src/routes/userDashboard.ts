import { Router } from 'express';
import { authMw, isFormValid } from '../middlewares/middlewares';
import * as updateQueries from '../controllers/updateQueries';
import * as deleteQueries from '../controllers/deleteQueries';

const router = Router();

router.put('/user', [authMw, isFormValid], updateQueries.updateUser);
router.delete('/user', authMw, deleteQueries.deleteUser);

export default router;
