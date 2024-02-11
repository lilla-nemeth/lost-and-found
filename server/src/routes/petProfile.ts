import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as readQueries from '../controllers/readQueries';

const router = Router();

router.get('/', authMw, readQueries.getAllUsers);

export default router;
