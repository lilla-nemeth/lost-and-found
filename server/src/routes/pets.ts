import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as readQueries from '../controllers/readQueries';

const router = Router();

router.get('/', authMw, readQueries.getAllUsers);
router.get('/pets/:fetch/:skip', readQueries.getPetsByPagination);
router.get('/pets/:id', readQueries.getPetById);

export default router;
