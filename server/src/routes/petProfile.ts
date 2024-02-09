import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as readQueries from '../sequelize/queries/read/readQueries';

const router = Router();

router.get('/', authMw, readQueries.getAllUsers);

export default router;
