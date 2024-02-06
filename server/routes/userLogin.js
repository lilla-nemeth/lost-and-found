import { Router } from 'express';
import { isFormValid } from '../middlewares/middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.post('/', [isFormValid], queries.signIn);

export default router;
