import { Router } from 'express';
import { authMw, isFormValid } from '../middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.put('/user', [authMw, isFormValid], queries.updateUserData);
router.delete('/user', authMw, queries.deleteUser);

export default router;
