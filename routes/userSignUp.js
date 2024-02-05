import { Router } from 'express';
import { isFormValid } from '../middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.post('/', [isFormValid], queries.createUserAccount);

export default router;
