import { Router } from 'express';
import { authMw } from '../middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.get('/', authMw, queries.getAllUsers);

export default router;
