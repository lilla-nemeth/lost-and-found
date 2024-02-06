import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as queries from '../sequelize/queries/queries';

const router = Router();

router.get('/', authMw, queries.getAllUsers);

export default router;
