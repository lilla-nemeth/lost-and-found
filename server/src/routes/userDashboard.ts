import { Router } from 'express';
import { authMw, isFormValid } from '../middlewares/middlewares';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.put('/user', [authMw, isFormValid], queries.updateUser);
router.delete('/user', authMw, queries.deleteUser);

export default router;
