import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import * as queries from '../sequelize/queries/queries';

const router = Router();

router.get('/', authMw, queries.getAllUsers);
router.get('/pets/:fetch/:skip', queries.getPetsByPagination);
router.get('/pets/:id', queries.getPetById);

export default router;